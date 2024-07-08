import { useQuery } from "@tanstack/react-query";
import axios from "../../lib/axios";
import useTitle from "../../hooks/useTitle";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/Loading";
import { Button } from "react-bootstrap";
import TableBody from "../../Shared/TableBody/TableBody";
import { useMemo } from "react";

export default function AllBookings() {
	useTitle("All Users");

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["bookings"],
		queryFn: async () => {
			try {
				const res = await axios.get("/booking");
				return res.data?.bookings;
			} catch (error) {
				console.error(error);
			}
		},
	});

	const handleDelete = (id) => {
		const agree = window.confirm(`Are you sure you want to delete? `);
		if (agree) {
			axios.delete(`/booking/delete/${id}`).then((res) => {
				if (res.data?.success) {
					toast.success("Booking deleted");
					refetch();
				} else {
					toast.error("Something went wrong");
				}
			});
		}
	};

	const handleAccept = (id) => {
		const agree = window.confirm(`Are you sure you want to accept? `);
		if (agree) {
			axios.patch(`/booking/approve/${id}`).then((res) => {
				if (res.data?.success) {
					toast.success("Booking accepted");
					refetch();
				} else {
					toast.error("Something went wrong");
				}
			});
		}
	};

	const handleDecline = (id) => {
		const agree = window.confirm(`Are you sure you want to decline? `);
		if (agree) {
			axios.patch(`/booking/cancel/${id}`).then((res) => {
				if (res.data?.success) {
					toast.success("Booking declined");
					refetch();
				} else {
					toast.error("Something went wrong");
				}
			});
		}
	};

	// ---------------------------------------------------------------------------------------

	// ---------------------------------------------------------------------------------------

	const columns = useMemo(
		() => [
			{
				Header: "#",
				accessor: "index",
				Cell: ({ row }) => <span className="table-numbering">{row.index + 1}</span>,
			},
			{
				Header: "OrderID",
				accessor: "orderId",
				Cell: ({ row }) => <span className="text-nowrap">{row.original.orderId}</span>,
			},
			{
				Header: "Order Name",
				accessor: "orderName",
			},
			{
				Header: "Name",
				accessor: "buyer.displayName",
			},
			{
				Header: "Place",
				accessor: "place.title",
			},
			{
				Header: "Country",
				accessor: "country",
			},
			{
				Header: "From",
				accessor: "dateFrom",
				Cell: ({ row }) => new Date(row.original.dateFrom).toLocaleDateString(),
			},
			{
				Header: "Guests",
				accessor: "numberOfGuest",
			},
			{
				Header: "Children",
				accessor: "numberOfChildren",
			},
			{
				Header: "Paid",
				accessor: "paidAmount",
			},
			{
				Header: "Amount",
				accessor: "actualAmount",
			},
			{
				Header: "Duration",
				accessor: "duration",
			},
			{
				Header: "Rooms",
				accessor: "room",
			},
			{
				Header: "TransactionID",
				accessor: "transactionId",
			},
			{
				Header: "Status",
				accessor: "status",
			},
			{
				Header: "Booking",
				accessor: "createdAt",
				Cell: ({ row }) => new Date(row.original.createdAt).toLocaleString(),
			},
			{
				Header: "Actions",
				accessor: "actions",
				Cell: ({ row }) => (
					<div className="actions-expand-btns">
						<Button
							variant="danger"
							size="sm"
							className="mb-1"
							onClick={() => handleDelete(row.original._id)}
						>
							Delete
						</Button>
						<Button
							variant="warning"
							size="sm"
							className="mb-1"
							onClick={() => handleDecline(row.original._id)}
						>
							Decline
						</Button>
						<Button
							variant="success"
							size="sm"
							onClick={() => handleAccept(row.original._id)}
						>
							Approve
						</Button>
					</div>
				),
			},
		],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	if (isLoading) return <Loading />;

	return <TableBody columns={columns} data={data} />;
}
