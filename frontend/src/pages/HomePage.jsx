
import CategoryItem from "../components/CategoryItem.jsx";
import ScrollAnimate from "../components/ScrollAnimate.jsx";

const categories = [
	{ href: "/Siro kháng sinh", name: "Siro kháng sinh", imageUrl: "/thuoc1.jpg" },
	{ href: "/Vitamin tổng hợp", name: "Vitamin tổng hợp", imageUrl: "/thuoc2.jpg" },
	{ href: "/Thuốc tim mạch huyết áp", name: "Thuốc tim mạch huyết áp", imageUrl: "/thuoc3.jpg" },
	{ href: "/Bổ não", name: "Bổ não", imageUrl: "/thuoc4.jpg" },
	{ href: "/Bổ sung Canxi Vitamin D", name: "Bổ sung Canxi Vitamin D", imageUrl: "/thuoc5.jpg" },
	{ href: "/Thuốc trị giun sán", name: "Thuốc trị giun sán", imageUrl: "/thuoc6.jpg" },
];

const HomePage = () => {

	return (
		<>
		<ScrollAnimate />
		<div className='relative min-h-screen text-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<h1  className='text-center text-5xl sm:text-6xl font-bold text-[#2a4427] mb-4'
					  style={{ fontFamily: "'Noto Serif', serif" }}
				>
					Sản phẩm được mua nhiều nhất
				</h1>
				
				<p className='text-center text-xl text-[#2a4427] mb-12 '
				   style={{ fontFamily: "'Noto Serif', serif" }}	
				>
					Sản phẩm được người dân tin dùng nhiều nhất
				</p>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

			</div>
		</div>

		</>
	);
};
export default HomePage;