import { motion } from "framer-motion";
import { Trash, Star } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const ProductsList = () => {
	const { deleteProduct, toggleFeaturedProduct, products } = useProductStore();

	console.log("products", products);

	return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg overflow-hidden min-w-5xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<table className=' min-w-full divide-y divide-gray-700'>
				<thead className='bg-gray-700'>
					<tr>
						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Sản Phẩm
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Giá
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Phân Loại
						</th>

						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Đánh Giá Cao
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Số Lượng
						</th>
						<th
							scope='col'
							className='px-6 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider'
						>
							Xóa
						</th>
					</tr>
				</thead>

				<tbody className='bg-gray-800 divide-y divide-gray-700'>
					{products?.map((product) => (
						<tr key={product._id} className='hover:bg-gray-700'>
							<td className='px-6 py-4 w-[30rem] whitespace-normal test-border '>
								<div className='flex items-center'>
									<div className='flex-shrink-0 h-10 w-10'>
										<img
											className='h-10 w-10 rounded-full object-cover'
											src={product.image}
											alt={product.name}
										/>
									</div>
									<div className='ml-4  '>
										<div className='text-sm font-medium text-white '>
											{product.name}
										</div>

									</div>
								</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-center '>
								<div className='text-sm text-gray-300'>{product.price.toLocaleString("vi-VN")} đ</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-center test-border'>
								<div className='text-sm text-gray-300'>{product.category}</div>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-center '>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full   ${
										product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
							<td className='px-6 py-4 whitespace-nowrap text-center test-border'>
								<div className='text-sm text-gray-300'>{product.Inventory_Quantity}</div>
							</td>
							
							<td className='px-6 py-4 whitespace-nowrap text-center text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</motion.div>
	);
};
export default ProductsList;