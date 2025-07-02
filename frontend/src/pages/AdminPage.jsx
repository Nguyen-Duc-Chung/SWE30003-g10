import { BarChart, PlusCircle, ShoppingBasket, ClipboardPlus  } from "lucide-react";

import AnalyticsTab from "../components/AnalyticsTab.jsx";
import CreateProductForm from "../components/CreateProductForm.jsx";
import ProductsList from "../components/ProductsList.jsx";
import PrescriptionsTab from "../components/PrescriptionsTab.jsx";
import PrescriptionDetail from "../components/PrescriptionDetail.jsx";

import { useState, useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";


const tabs = [
    { id: "create", label: "Create Product", icon: PlusCircle },
	{ id: "products", label: "Products", icon: ShoppingBasket },
	{ id: "analytics", label: "Analytics", icon: BarChart },
    { id: "prescriptions", label: "Prescriptions", icon: ClipboardPlus },
];


const AdminPage = () => {
    const [ activeTab, setActivetab ] = useState("create");
    const { fetchAllProducts } = useProductStore();
    const [selectedPrescription, setSelectedPrescription] = useState(null);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);
    
    return (<>
        <div className='min-h-screen relative overflow-hidden' >
            <div className='relative z-10 container mx-auto px-4 py-16'>
                <h1 className='text-4xl font-bold mb-8 text-emerald-400 text-center' >Admin Dashboard</h1>

                <div className='flex justify-center mb-8'>
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActivetab(tab.id)}
                            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
								activeTab === tab.id
									? "bg-emerald-600 text-white"
									: "bg-gray-700 text-gray-300 hover:bg-gray-600"
							} `}
                        >
                            <tab.icon className='mr-2 h-5 w-5' />
							{tab.label}
                        </button>
                    ))}
                </div>

                    {activeTab === "create" && <CreateProductForm />}
				    {activeTab === "products" && <ProductsList />}
				    {activeTab === "analytics" && <AnalyticsTab />}
                    {/* {activeTab === "prescriptions" && <PrescriptionsTab />} */}


                    {activeTab === "prescriptions" && !selectedPrescription && (
                    <PrescriptionsTab onViewDetail={setSelectedPrescription} />
                    )}

                    {activeTab === "prescriptions" && selectedPrescription && (
                    <PrescriptionDetail prescription={selectedPrescription} 
                    onBack={() => setSelectedPrescription(null)}/>
                    )}

                    

            </div>
        </div>
    </>)

}

export default AdminPage