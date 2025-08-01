import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import { ShoppingCart, Stethoscope, PackageX } from "lucide-react";
import axios from '../lib/axios';
import { useProductStore } from '../stores/useProductStore';
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { getProductById } = useProductStore();
  const [product, setProduct] = useState(null);
  const [prescriptionStatus, setPrescriptionStatus] = useState(null);

  const { user } = useUserStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
      if (!user) {
        toast.error("Please login to add products to cart", { id: "login" });
        return;
      } else {
        // add to cart
        addToCart(product);
      }
	};

  useEffect(() => {
    const checkPrescription = async () => {
      try {
        const res = await axios.get(`/prescriptions/product/${id}`);
        console.log("Prescription status fetched:", res.data);
        setPrescriptionStatus(res.data.status);
      } catch (err) {
        console.error("Error fetching prescription status:", err);
      }
    };

    if (product?.requirePrescription) {
      checkPrescription();
    }
    console.log("Effect ran!");
  }, [id, product]);

  let canPurchase = false;
  if (product) {
                              //  ✅✅✅✅ NEW CODE
    canPurchase = (!product.requirePrescription || prescriptionStatus === 'Chấp Thuận') && product.Inventory_Quantity > 0;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProductById(id);
      if (result) setProduct(result);
    };
    fetchProduct();
  }, [id, getProductById]);

  if (!product) return <div className="text-center py-10 text-xl">Loading...</div>;

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='relative z-10 mx-auto px-4 py-16'>
        <div className="max-w-7xl mx-auto p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT: IMAGE */}
            <div>
              <img
                src={product.image}
                className="rounded-lg border md:h-150 w-full object-cover h-full md:w-300"
                alt={product.name}
              />
            </div>

            {/* RIGHT: INFO */}
            <div className="flex flex-col justify-between space-y-4 h-full">
              <div className="text-sm text-gray-500">
                Thương hiệu: <span className="text-blue-600">{product.brand}</span>
              </div>

              <h1 className="text-2xl font-semibold text-gray-800">{product.name}</h1>

              <div className="flex items-center text-sm text-gray-500 space-x-3">
                <span>{product._id.slice(0, 8)}</span>
              </div>

                <div className="flex items-baseline space-x-4">
                    <span className="text-3xl font-bold text-blue-600">{product.price.toLocaleString()}₫</span>
                    <span className="text-sm text-gray-500">/ Hộp</span>
                </div>

                <div className="flex">
                    <dt className="w-32 text-gray-500">Danh mục:</dt>
                    <dd className="flex-1">
                        <a href="#" className="text-blue-600 hover:underline">{product.category}</a>
                    </dd>
                </div>
                <div className="flex">
                    <dt className="w-32 text-gray-500">Loại:</dt>
                    <dd className="flex-1">
                        <a href="#" className="text-blue-600 hover:underline">{product.specific_category}</a>
                    </dd>
                </div>
                <div className="flex">
                    <dt className="w-32 text-gray-500">Số lượng:</dt>
                    <dd className="flex-1">
                      {
                        product.Inventory_Quantity > 0 ? (
                          <a href="#" className="text-green-600 hover:underline">Còn {product.Inventory_Quantity} Sản phẩm</a>
                        ) : (
                          <a href="#" className="text-red-600 hover:underline">Còn {product.Inventory_Quantity} Sản phẩm</a>
                        )
                      }
                    </dd>    
                </div>
                <div className="flex">
                    <dt className="w-32 text-gray-500">Đối tượng sử dụng:</dt>
                    <dd className="flex-1 text-gray-800">
                        {product.subject.join(', ')}
                    </dd>
                </div>
                <div className="flex">
                    <dt className="w-32 text-gray-500">Nước sản xuất:</dt>
                    <dd className="flex-1 text-gray-800">
                        {product.manufacturing_country}
                    </dd>
                </div>

                <div className="w-full text-gray-500">
                    <span className="font-semibold text-[18px] ">Thành phần:</span>
                    <p className="text-gray-800">{product.medicine_component}</p>
                </div>

                <div className="w-full text-gray-500 ">
                    <span className="font-semibold text-[18px]  ">Mô tả:</span>
                    <p className="text-gray-800">{product.description}</p>
                </div>

                {/* 
                {canPurchase ? (
                  <>
                    <div>
                      <div className="text-sm text-green-600 border border-green-300 bg-green-50 rounded p-3 mb-[5px]">
                          Bạn được chấp thuận để mua sản phẩm này.
                        </div>
                      <div className="flex space-x-4"> 
                        <button 
                          className='flex items-center w-full justify-center rounded-lg bg-emerald-600 px-5 py-2 text-center text-[15px] font-medium
                          text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart size={22} className='mr-2' />
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-3">
                      Bạn cần có đơn thuốc được duyệt để mua sản phẩm này.
                    </div>
                    <Link to="/prescription" state={{ product }}>
                      <div className="flex space-x-4 mt-4">
                        <button
                          className='flex items-center w-full justify-center rounded-lg bg-emerald-600 px-5 py-2 text-center text-[15px] font-medium
                          text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300'
                        >
                          <Stethoscope size={22} className='mr-2' />
                          Gửi Đơn thuốc
                        </button>
                      </div>
                    </Link>
                  </>
                )}
                */}
                {/*  ✅✅✅✅ NEW CODE */}
                {product.Inventory_Quantity > 0 ? (
                  canPurchase ? (
                    <>
                      <div className="flex space-x-4">
                        <button 
                          className='flex items-center w-full justify-center rounded-lg px-5 py-2 
                          text-center text-[15px] font-medium focus:outline-none focus:ring-4 
                          text-white bg-[#52b0cd] 
                          hover:bg-white hover:text-[#001543] duration-250 
                            border-2 border-transparent hover:border-[#52b0cd]
                          '
                          onClick={handleAddToCart}
                        >
                          <ShoppingCart size={22} className='mr-2' />
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm text-red-600 border border-red-300 bg-red-50 rounded p-3">
                        Bạn cần có đơn thuốc được duyệt để mua sản phẩm này.
                      </div>
                      <Link to="/prescription" state={{ product }}>
                        <div className="flex space-x-4 mt-4">
                          <button
                            className='flex items-center w-full justify-center rounded-lg                              px-5 py-2 text-center text-[15px] font-medium
                            focus:outline-none focus:ring-4
                          text-white bg-[#52b0cd] 
                          hover:bg-white hover:text-[#001543] duration-250 
                            border-2 border-transparent hover:border-[#52b0cd] '
                          >
                            <Stethoscope size={22} className='mr-2' />
                            Gửi Đơn thuốc
                          </button>
                        </div>
                      </Link>
                    </>
                  )
                ) : (
                  <div className='flex items-center w-full justify-center rounded-lg bg-[#878787] px-5 py-2 text-center text-[15px] font-medium text-white focus:outline-none focus:ring-4'>
                    <PackageX size={22} className='mr-2' />
                    Sản phẩm hết hàng
                  </div>
                )}




              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
