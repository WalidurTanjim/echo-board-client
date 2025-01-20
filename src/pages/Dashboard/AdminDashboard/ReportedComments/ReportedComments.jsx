import React from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';
import useReportedReviews from '../../../../hooks/useReportedReviews';
import Spinner from '../../../../components/Spinner/Spinner';
import ReportedComment from '../../../../components/ReportedComment/ReportedComment';

const ReportedComments = () => {
    const [ reported_reviews, isPending, isError, error, refetch ] = useReportedReviews();

    return (
        <section className='reported-comments'>
            <DashboardRoutes />

            <div className='container mx-auto px-6 py-14'>
                <SectionTitle title="Reported Comments" sub_title="Review and Manage Reported Comments" />

                {
                    isPending ? (
                        <Spinner />
                    ) : isError ? (
                        <div className='py-14 border rounded-md flex items-center justify-center'>
                            <h1 className='text-xl font-medium text-red-600'>{error?.message}</h1>
                        </div>
                    ) : 
                    <div>
                        {
                            reported_reviews?.map(review => <ReportedComment key={review?._id} review={review} />)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default ReportedComments;