import { useQuery } from "@tanstack/react-query";
import useTitle from "../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";
import axios from "../../lib/axios";
import { baseUrl } from "../../constants";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Button } from "react-bootstrap";
import TableBody from "../../Shared/TableBody/TableBody";
import toast from "react-hot-toast";

const AllOwners = () => {
	const { user: me } = useContext(AuthContext);
	useTitle("All Admins");

	const {
		data: allUsers = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			try {
				const res = await fetch(`${baseUrl}/dashboard/allbuyers`); // admins
				const data = await res.json();
				return data.users;
			} catch (error) {
				console.error(error);
				throw new Error(error);
			}
		},
	});

	const columns = useMemo(
		() => [
			{
				Header: "#",
				accessor: "index",
				Cell: ({ row }) => <span className="table-numbering">{row.index + 1}</span>,
			},
			{
				Header: "Name",
				accessor: "displayName",
			},
			{
				Header: "Address",
				accessor: "email",
			},
			{
				Header: "Actions",
				accessor: "actions",
				Cell: ({ row }) => (
					<Button
						disabled={me?.email === row.original.email}
						variant="danger"
						size="sm"
						onClick={() => handleDelete(row.original._id)}
					>
						Delete
					</Button>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleDelete = (id) => {
		const agree = window.confirm(`Are you sure you want to delete :${id} `);
		if (agree) {
			axios.delete(`/users/${id}`).then((res) => {
				if (res.status === 200) {
					toast.success("Admin deleted successful.");
					refetch();
				}
			});
		}
	};

	if (isLoading) {
		return <Loading />;
	}

	return <TableBody columns={columns} data={allUsers} />;
};

export default AllOwners;
