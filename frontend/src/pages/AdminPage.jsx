import { BarChart, PlusCircle, ShoppingBasket, ClipboardPlus  } from "lucide-react";

import AnalyticsTab from "../components/AnalyticsTab.jsx";
import CreateProductForm from "../components/CreateProductForm.jsx";
import ProductsList from "../components/ProductsList.jsx";
import PrescriptionsTab from "../components/PrescriptionsTab.jsx";
import PrescriptionDetail from "../components/PrescriptionDetail.jsx";

import { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useUserStore } from "../stores/useUserStore"; //  ✅✅✅✅ NEW CODE



const AdminPage = () => {
    const { user } = useUserStore(); //  ✅✅✅✅ NEW CODE get logged-in user inf
    const tabs = [
        ...(user?.role === "Product_Manager" || user?.role === "Admin"
            ? [ { id: "create", label: "Tạo Sản Phẩm", icon: PlusCircle },
                { id: "products", label: "Sản Phẩm", icon: ShoppingBasket },]
            : []
         ),
        ...(user?.role === "Pharmacists" || user?.role === "Admin" //  ✅✅✅✅ NEW CODE
            ? [{ id: "prescriptions", label: "Đơn Thuốc", icon: ClipboardPlus }]
            : []),
        ...(user?.role === "Cashiers" || user?.role === "Admin" //  ✅✅✅✅ NEW CODE
            ? [{ id: "analytics", label: "Thu Ngân", icon: BarChart },]
            : []),
        
        
        
    ];
    const [ activeTab, setActivetab ] = useState("create");
    const { fetchAllProducts } = useProductStore();
    const [selectedPrescription, setSelectedPrescription] = useState(null);
    

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);
    
    return (<>
        <div className='min-h-screen relative overflow-hidden' >
            <div className='relative z-10 container mx-auto px-4 py-16'>
                <h1 className='text-4xl font-bold mb-8 text-[#001543] text-center' >Trang quản trị - {user?.role.toUpperCase()} </h1>

                <div className='flex justify-center mb-8'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActivetab(tab.id)}
                            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-[#52b0cd] text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							} `}
                        >
                            <tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
                        </button>
                    ))}
                </div>

                    {activeTab === "create" && (user?.role === "Product_Manager" || user?.role === "Admin") && <CreateProductForm />}
				    {activeTab === "products"&& (user?.role === "Product_Manager" || user?.role === "Admin") && <ProductsList />}
				    {activeTab === "analytics" && <AnalyticsTab />}

                   {/*  ✅✅✅✅ NEW CODE */}
                    {activeTab === "prescriptions" && (user?.role === "Pharmacists" || user?.role === "Admin") && !selectedPrescription && (
                        <PrescriptionsTab onViewDetail={setSelectedPrescription} />
                    )}

                    {activeTab === "prescriptions" && (user?.role === "Pharmacists" || user?.role === "Admin") && selectedPrescription && (
                        <PrescriptionDetail
                            prescription={selectedPrescription}
                            onBack={() => setSelectedPrescription(null)}
                        />
                    )}

                    

            </div>
        </div>
    </>)

}

export default AdminPage