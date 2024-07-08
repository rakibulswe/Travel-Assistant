import "./ShoppingMall.css";

export default function ShoppingMall({ data }) {
	return (
		<section>
			<p className="fs-4 pb-2 heading">Available Shopping mall</p>
			<div className="available-packages">
				{data.map((mall) => (
					<article key={mall._id} className="shadow-sm shopping-mall-container">
						<div>
							<img src={mall.imageURL} alt="" />
							<div className="description">
								<small>{mall.description}</small>
							</div>
						</div>
						<div className="shopping-mall-body">
							<h4 className="mt-2 mb-3">
								<span className="text-uppercase">{mall.name} </span>
							</h4>
							<p>Address: {mall.address}</p>
						</div>
					</article>
				))}
			</div>
		</section>
	);
}
