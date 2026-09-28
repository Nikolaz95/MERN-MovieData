import React, { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast';
import titleName from '../../../../hooks/useTitle';
//import css
import "./ListOfUsers.css"

//import components
import DashBoardLayout from '../Layouts/DashBoardLayout/DashBoardLayout';
import PaginationComponent from '../../../../layouts/Pagination/PaginationComponent';
import TableList from './TableContent/TableList';
import { PageHeader } from '../../UserPage/userLayout/DashboardUI';
import { useGetAdminUsersQuery } from '../../../../../redux/api/userApi';

const ROLE_FILTERS = [
    { key: "all", label: "All" },
    { key: "admin", label: "Admins" },
    { key: "user", label: "Users" },
];

const ListOfUsers = () => {
    titleName(`List Of Users`);
    const [currentPage, setCurrentPage] = useState(1);
    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const usersPerPage = 9;


    const { data, isLoading, isError, error } = useGetAdminUsersQuery();


    // Use real data instead of mock data
    const users = data?.users || [];

    // search (name / email) + role filter
    const filteredUsers = useMemo(() => {
        const q = query.trim().toLowerCase();
        return users.filter((user) => {
            const matchesRole = roleFilter === "all" || user.role === roleFilter;
            const matchesQuery = !q || user.name?.toLowerCase().includes(q) || user.email?.toLowerCase().includes(q);
            return matchesRole && matchesQuery;
        });
    }, [users, query, roleFilter]);

    // new search / filter -> back to the first page
    useEffect(() => {
        setCurrentPage(1);
    }, [query, roleFilter]);

    // Pagination calculations
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Handle page change
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };


    useEffect(() => {
        if (isError) {
            toast.error(error?.data?.message || 'Failed to fetch users');
        }
    }, [isError, error]);


    return (
        <DashBoardLayout>
            <section className='listOfUsersSection'>
                <PageHeader title="Users" count={users.length} subtitle="Manage accounts and roles" />

                {/* search + role filter */}
                <div className="usersToolbar">
                    <div className="usersSearch">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-3.5-3.5" />
                        </svg>
                        <input type="search" value={query} onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or email..." aria-label="Search users" />
                    </div>

                    <div className="usersRoleFilter" role="group" aria-label="Filter by role">
                        {ROLE_FILTERS.map((filter) => (
                            <button key={filter.key} type="button"
                                className={`usersRoleFilterBtn ${roleFilter === filter.key ? "active" : ""}`}
                                aria-pressed={roleFilter === filter.key}
                                onClick={() => setRoleFilter(filter.key)}>
                                {filter.label}
                            </button>
                        ))}
                    </div>
                </div>

                <TableList currentUsers={currentUsers} isLoading={isLoading}
                    emptyText={users.length === 0 ? "No users yet." : "No users match your search."} />

                {totalPages > 1 && (
                    <PaginationComponent
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handleChange={handleChange}
                    />
                )}
            </section>
        </DashBoardLayout>
    )
}

export default ListOfUsers
