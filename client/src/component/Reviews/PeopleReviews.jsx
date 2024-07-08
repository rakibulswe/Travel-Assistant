// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import { MdStar } from "react-icons/md";

export default function PeopleReviews({ allReviews }) {
	return (
		<section>
			<p className="fs-4 pb-2 heading">Top Reviews For Treker</p>
			{allReviews.length ? (
				<Swiper
					autoplay={{
						delay: 4500,
						disableOnInteraction: true,
					}}
					loop={true}
					centeredSlides={true}
					navigation={true}
					modules={[Autoplay, Navigation]}
					slidesPerView={1}
				>
					{allReviews.map((review, index) => (
						<SwiperSlide key={index} className="review-rating">
							<img
								className="quota"
								src="/quotes.svg"
								alt={review.reviewedBy?.displayName}
							/>
							<h5 className="mt-2">
								{review.reviewedBy?.displayName} (
								<span className="d-inline-flex align-items-center">
									{review.rating}
									<MdStar color="#ffd700" />
								</span>
								)
							</h5>
							<p className="review-text">"{review.text}"</p>
							<img
								src={review.reviewedBy?.photoURL}
								width={60}
								height={60}
								className="rounded-circle"
								alt=""
							/>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<p className="p-4">Currently no reviews available for this tour.</p>
			)}
		</section>
	);
}
