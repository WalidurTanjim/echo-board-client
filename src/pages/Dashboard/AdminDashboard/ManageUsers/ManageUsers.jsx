import React from 'react';
import DashboardRoutes from '../../../../components/DashboardRoutes/DashboardRoutes';
import SectionTitle from '../../../../components/SectionTitle/SectionTitle';

const ManageUsers = () => {
    return (
        <section className='manage-users'>
            <DashboardRoutes />

            <div className="container mx-auto px-6 py-14">
                <SectionTitle title="Manage Users" sub_title="You can manage all users from here" />

                <section className="container px-4 mx-auto">
                    
                </section>
            </div>
        </section>
    );
};

export default ManageUsers;