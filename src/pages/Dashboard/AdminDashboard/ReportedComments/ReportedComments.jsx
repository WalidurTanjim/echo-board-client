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

                <h1 className='mb-4 flex gap-2 items-center text-lg font-medium text-slate-700'>Total reported comments: <span className='text-sm px-3 rounded-full border border-blue-300 bg-blue-50 text-blue-500'>{reported_reviews.length > 0 ? reported_reviews.length : 0}</span></h1>

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
                            reported_reviews?.map(review => <ReportedComment key={review?._id} review={review} refetch={refetch} />)
                        }
                    </div>
                }
            </div>
        </section>
    );
};

export default ReportedComments;