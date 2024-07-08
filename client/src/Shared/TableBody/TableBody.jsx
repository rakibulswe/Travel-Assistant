import { useMemo } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { GoSearch } from "react-icons/go";

export default function TableBody({ columns, data }) {
	const tableData = useMemo(() => data || [], [data]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using `rows`, we'll use `page` for pagination
		canPreviousPage,
		canNextPage,
		pageOptions,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize, globalFilter },
		setGlobalFilter,
	} = useTable(
		{
			columns,
			data: tableData,
			initialState: { pageIndex: 0, pageSize: 10 }, // Set initial page size
		},
		useGlobalFilter, // Use global filter (search)
		useSortBy, // Use sorting
		usePagination // Use pagination
	);

	const handleSearch = (e) => {
		setGlobalFilter(e.target.value || undefined); // Set global filter to the search value
	};

	return (
		<section className="tours-table mb-4">
			<div className="d-flex" style={{ marginBottom: "12px" }}>
				<div className="search-icon">
					<GoSearch />
				</div>
				<input
					value={globalFilter || ""}
					onChange={handleSearch}
					placeholder="Search all columns"
					className="search"
				/>
			</div>
			<div className="table-responsive">
				<table
					{...getTableProps()}
					className="table table-striped table-bordered table-hover mb-0"
				>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render("Header")}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? "Down"
													: "Up"
												: ""}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()}>
									{row.cells.map((cell) => (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									))}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			<div className="pagination mt-3 mb-2">
				<div className="page-info">
					<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
						{"<<"}
					</button>{" "}
					<button onClick={() => previousPage()} disabled={!canPreviousPage}>
						{"<"}
					</button>{" "}
					<button onClick={() => nextPage()} disabled={!canNextPage}>
						{">"}
					</button>{" "}
					<button
						onClick={() => gotoPage(pageOptions.length - 1)}
						disabled={!canNextPage}
					>
						{">>"}
					</button>{" "}
					<span>
						Page{" "}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{" "}
					</span>
				</div>
				<div className="search-page">
					<span>
						Go to page:{" "}
						<input
							type="number"
							min={1}
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
						/>
					</span>{" "}
					<select
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[10, 20, 30, 40, 50].map((pageSize) => (
							<option key={pageSize} value={pageSize}>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			</div>
		</section>
	);
}
