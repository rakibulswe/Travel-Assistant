import { useQuery } from "@tanstack/react-query";
import useTitle from "../../hooks/useTitle";
import Loading from "../../Shared/Loading/Loading";
import axios from "../../lib/axios";
import { useMemo } from "react";
import TableBody from "../../Shared/TableBody/TableBody";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

const AllRenters = () => {
	useTitle("All Users");

	const {
		data: allUsers = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ["users"],
		queryFn: async () => {
			try {
				const res = await axios.get("/dashboard/allsellers"); // users
				return res.data?.users;
			} catch (error) {}
		},
	});

	const handleDelete = (id) => {
		const agree = window.confirm(`Are you sure you want to delete :${id} `);
		if (agree) {
			axios.delete(`/users/${id}`).then((res) => {
				if (res.status === 0) {
					toast.success("User deleted successfully");
					refetch();
				}
			});
		}
	};

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

	if (isLoading) {
		return <Loading />;
	}

	return <TableBody columns={columns} data={allUsers} />;
};

export default AllRenters;
