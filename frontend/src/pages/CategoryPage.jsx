import { useState, useEffect } from "react"
import { useProductStore } from "../stores/useProductStore.js";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard.jsx";
import '../style/category_page.css'
import { ArrowDown, ArrowUp, Funnel } from 'lucide-react';


const CategoryPage = () => {
  const { fetchProductsByCategory , products, fetch_Products_By_Specific_Category } = useProductStore();
  const {  category, specCategory } = useParams();
  const [shouldFilter, setShouldFilter] = useState(false);
  

  // useEffect(() => {
  //   fetchProductsByCategory(category);
  // }, [ fetchProductsByCategory , category ]);

  useEffect(() => {
    fetch_Products_By_Specific_Category(specCategory);
  }, [ fetch_Products_By_Specific_Category , specCategory ]);

  // console.log("Products: ", products);

  // Price options
  const priceOptions = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Dưới 100.000đ', value: 'under_100' },
    { label: '100.000đ đến 300.000đ', value: '100_300' },
    { label: '300.000đ đến 500.000đ', value: '300_500' },
    { label: 'Trên 500.000đ', value: 'over_500' },
  ];

  const [priceOpen, setPriceOpen] = useState(true);
  const [selectedPrice, setSelectedPrice] = useState(null);

  // Drug type options
  const drugTypes = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Thuốc kê đơn', value: 'yes' },
    { label: 'Thuốc không kê đơn', value: 'no' },
  ];
  const [drugOpen, setDrugOpen] = useState(true);
  const [selectedDrugTypes, setSelectedDrugTypes] = useState(['all']);

  const handleDrugToggle = (value) => {
    if (value === 'all') {
      setSelectedDrugTypes(['all']);
    } else {
      setSelectedDrugTypes((prev) => {
        const newSelection = prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev.filter((v) => v !== 'all'), value];

        return newSelection.length > 0 ? newSelection : ['all'];
      });
    }
  };


  // Usage target options
  const targets = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Trẻ em', value: 'Trẻ em' },
    { label: 'Phụ nữ có thai', value: 'Phụ nữ có thai' },
    { label: 'Phụ nữ cho con bú', value: 'Phụ nữ cho con bú' },
    { label: 'Người lớn', value: 'Người lớn' },
  ];

  const [targetsOpen, setTargetsOpen] = useState(true);
  const [showAllTargets, setShowAllTargets] = useState(false);
  const [selectedTargets, setSelectedTargets] = useState(['all']);

  // ─────────────────────────────────────────────────────────────────
  // Compute filteredProducts based on price, prescription, and targets
  // ─────────────────────────────────────────────────────────────────
  const handleTargetToggle = (value) => {
    if (value === 'all') {
      // If "Tất cả" is clicked, deselect all specific targets
      setSelectedTargets(['all']);
    } else {
      setSelectedTargets((prev) => {
        const newSelection = prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev.filter((v) => v !== 'all'), value];

        // If none selected after toggle, default back to 'all'
        return newSelection.length > 0 ? newSelection : ['all'];
      });
    }
  };

 
  const filteredProducts = shouldFilter ? products

  // 1) Price filter
  .filter(p => {
    if (!selectedPrice || selectedPrice === 'all') return true;
    const price = Number(p.price);
    switch (selectedPrice) {
      case 'under_100':   return price < 100_000;
      case '100_300':     return price >= 100_000 && price <= 300_000;
      case '300_500':     return price > 300_000 && price <= 500_000;
      case 'over_500':    return price > 500_000;
      default:            return true;
    }
  })

    // 2) Prescription filter
    .filter(p => {
      if (selectedDrugTypes.includes('all')) return true;
      const tag = p.requirePrescription ? 'yes' : 'no';
      return selectedDrugTypes.includes(tag);
    })
    // 3) Subject/Target filter
    .filter(p => {
      if (selectedTargets.includes('all')) return true;
      return selectedTargets.some(t => p.subject.includes(t));
    })
    : products;

  return (
    <div className=' categoryPageContainer min-h-screen' >
      <div className=' productCardDivs relative z-10 max-w-screen-2xl mx-auto px-4 sm:px-3 lg:px-5 py-16'>

        <h1 className='text-center text-4xl sm:text-5xl font-black text-[#001543] mb-8 '
        style={{ fontFamily: "'Noto Serif', serif" }} 
        >
          {specCategory}
        </h1>

        <div className='productCardDivs grid grid-cols-1 sm:grid-cols-4  ' >

          {/* FILTER SECTION */}
          <div className='
                  filterDivs  p-4 rounded-md bg-[#001543] text-[#88D9F2] ' 
                  // h-[100vh]   text-[#77D1ED]
          >
            
            {/* Header */}
            <div className="flex items-center text-lg font-semibold mb-6">
              <Funnel className="h-5 w-5 mr-2" />
              Bộ lọc nâng cao
            </div>
            
            <div className="space-y-6 width=[100%] grid grid-cols-1 ">
              {/* Giá bán Section */}
              <div className="">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setPriceOpen(o => !o)}
                >
                  <span className="font-medium text-base">Giá bán</span>
                  {priceOpen ? (
                    <ArrowUp className="h-5 w-5" />
                  ) : (
                    <ArrowDown className="h-5 w-5" />
                  )}
                </div>
                {priceOpen && (
                  <div className="mt-3 space-y-3">
                    {priceOptions.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedPrice(opt.value)}
                        className={`w-full text-left py-2 px-3 border rounded-md  transition-colors text-white
                          ${selectedPrice === opt.value ? 'border-2 border-[#88D9F2] ' : 'border-white'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Loại thuốc Section */}
              <div className="">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setDrugOpen(o => !o)}
                >
                  <span className="font-medium text-base">Loại thuốc</span>
                  {drugOpen ? (
                    <ArrowUp className="h-5 w-5" />
                  ) : (
                    <ArrowDown className="h-5 w-5" />
                  )}
                </div>
                {drugOpen && (
                  <div className="mt-3 space-y-2">
                      {drugTypes.map(opt => (
                        <label
                          key={opt.value}
                          className="flex items-center space-x-2 text-white "
                        >
                          <input
                            type="checkbox"
                            checked={selectedDrugTypes.includes(opt.value)}
                            onChange={() => handleDrugToggle(opt.value)}
                            className="h-4 w-4 text-blue-500 border-gray-300 rounded"
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                  </div>
                )}
              </div>

              {/* Đối tượng sử dụng Section */}
              <div>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setTargetsOpen(o => !o)}
                >
                  <span className="font-medium text-base">Đối tượng sử dụng</span>
                  {targetsOpen ? (
                    <ArrowUp className="h-5 w-5" />
                  ) : (
                    <ArrowDown className="h-5 w-5" />
                  )}
                </div>
                {targetsOpen && (
                  <div className="mt-3 space-y-2">
                      {targets.map(opt => (
                          <label
                            key={opt.value}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedTargets.includes(opt.value)}
                              onChange={() => handleTargetToggle(opt.value)}
                              className="h-4 w-4 text-blue-500 border-gray-300 rounded "
                            />
                            <span className="text-white">{opt.label}</span>
                          </label>
                        ))}
                    
                  </div>
                )}
              </div>

              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => setShouldFilter(true)}
                  className="flex-1 py-2 px-3 rounded-md font-medium 
                            text-white bg-[#52b0cd] 
                            hover:bg-white hover:text-[#001543] duration-250 "
                >
                  Lọc
                </button>
                <button
                  onClick={() => {
                    setSelectedPrice(null);
                    setSelectedDrugTypes(['yes']);
                    setSelectedTargets(['all']);
                    setShouldFilter(false);
                  }}
                  className="flex-1 py-2 px-3 rounded-md text-white bg-gray-600 hover:bg-red-600 duration-200 font-medium"
                >
                  Xóa bộ lọc
                </button>
              </div>


            </div>
          </div>

          {/* PRODUCT LISTING SECTION */}
          <div 
            className=' productCardListsDivs 
            ml-3 p-2
            grid col-span-3  sm:grid-col-span-1
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
            gap-6 justify-items-center '  >
            {filteredProducts.length === 0 && (
              <h2 className='text-3xl font-semibold text-gray-300 text-center col-span-full'>
                No products found
              </h2>
            )}

            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

export default CategoryPage
