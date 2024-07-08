import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import { Button } from "react-bootstrap";

import TableBody from "../../Shared/TableBody/TableBody";

export default function AllTours() {
	useTitle("All Tours");

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["places"],
		queryFn: async () => {
			try {
				const res = await axios.get("/places/productCollection");
				return res.data?.places;
			} catch (error) {
				console.error(error);
			}
		},
	});

	const handleDelete = (id) => {
		const agree = window.confirm("Are you sure you want to delete?");
		if (agree) {
			axios.delete(`/places/${id}`).then((res) => {
				if (res.data?.success) {
					toast.success("Tour deleted");
					refetch();
				} else {
					toast.error("Something went wrong");
				}
			});
		}
	};

	const columns = [
		{
			Header: "#",
			accessor: "index",
			Cell: ({ row }) => <span className="table-numbering">{row.index + 1}</span>,
		},
		{
			Header: "Title",
			accessor: "title",
		},
		{
			Header: "Address",
			accessor: "address",
		},
		{
			Header: "Fee",
			accessor: "fee",
		},
		{
			Header: "Area",
			accessor: "area",
		},
		{
			Header: "Category",
			accessor: "category",
		},
		{
			Header: "City",
			accessor: "city",
		},
		{
			Header: "Actions",
			accessor: "actions",
			Cell: ({ row }) => (
				<Button variant="danger" size="sm" onClick={() => handleDelete(row.original._id)}>
					Delete
				</Button>
			),
		},
	];

	if (isLoading) return <Loading />;

	return <TableBody columns={columns} data={data} />;
}
