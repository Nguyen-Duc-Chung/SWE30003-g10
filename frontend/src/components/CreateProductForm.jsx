import { useState } from "react";
import { PlusCircle, Upload, Loader } from "lucide-react";
import  { useProductStore } from "../stores/useProductStore"; 

        
import '../style/abc.css';

// const categories = ["jeans", "t-shirts", "shoes", "glasses", "jackets", "suits", "bags"];
const categories = ["Vitamin & Khoáng chất", "Thuốc kháng sinh, kháng nấm", "Thuốc tim mạch & máu" , "Thần kinh não"];
const specific_categories1 = [ "Vitamin tổng hợp" , "Bổ sung Canxi Vitamin D", "Bổ sung Kẽm Magie" ];
const specific_categories2 = [ "Thuốc trị giun sán", "Siro kháng sinh", "Thuốc trị sốt rét" ];
const specific_categories3 = [ "Thuốc tim mạch huyết áp", "Thuốc cầm máu", "Thuốc trị mỡ máu" ];
const specific_categories4 = [ "Tuần hoàn máu", "Hoạt huyết", "Bổ não" ];

const subjects = [ "Trẻ em", "Phụ nữ có thai", "Phụ nữ cho con bú", "Người lớn" ];
const countries = [ "Hoa Kỳ" ,"Việt Nam" , "Pháp" , "Úc" , "Anh" , "Nhật Bản" , 
                    "Ý", "Đức" ,"Ba Lan" , "Slovenia", "Canada", "Thái Lan" , 
                    "Indonesia", "Thổ Nhĩ Kỳ" ];

const CreateProductForm = () => {

  const [newProduct, setNewProduct] = useState({
    brand: "",
    name: "",
    description: "",
    price: "",
    category: "",
    specific_category: "",
    image: "",
    manufacturing_country: "",
    requirePrescription: "no",
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const { createProduct, loading } = useProductStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newProduct);
    try{
    await createProduct({...newProduct, subject: selectedSubjects });
    setNewProduct({name: "", description: "", price: "", category: "", specific_category: "", 
                   brand: "", image: "", manufacturing_country: "", requirePrescription: "",
    });
    setSelectedSubjects([]);

    } catch(error) {
      console.log("error creating a product", error.message);

    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();

      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      }

      reader.readAsDataURL(file);
    }
  }

  const getSpecificCategories = (category) => {
      switch (category) {
        case "Vitamin & Khoáng chất":
          return specific_categories1;
        case "Thuốc kháng sinh, kháng nấm":
          return specific_categories2;
        case "Thuốc tim mạch & máu":
          return specific_categories3;
        case "Thần kinh não":
          return specific_categories4;
        default:
          return [];
      }
  };

  const specificOptions = getSpecificCategories(newProduct.category);

  const handleSubjectChange = (subject) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  return (
    <div className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto' >
      <h2 className='text-2xl font-semibold mb-6 text-emerald-300'>Create New Product</h2>

      <form onSubmit={handleSubmit} className='space-y-4' > 
          <div>
            <label htmlFor='brand' className='block text-sm font-medium text-gray-300'>
              Thương hiệu (Brand)
            </label>
            <input
              type='text'
              id='brand'
              name='brand'
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>

          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-300'>
              Tên Sản Phẩm
            </label>
            <input
              type='text' id='name' name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
            />
          </div>

          <div>
              <label htmlFor='description' className='block text-sm font-medium text-gray-300'>
                Thành Phần
              </label>
              <textarea
                id='description' name='description'
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                rows='3'
                className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500   focus:border-emerald-500'
              />
				  </div>

          <div>
              <label htmlFor='price' className='block text-sm font-medium text-gray-300'>
                Giá
              </label>
              <input
                type='number' id='price' name='price'
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                step='0.01'
                className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500  focus:border-emerald-500'
              />
				  </div>

          <div className=" categoryInput flex flex-wrap justify-between " >     
                <div>
                    <label htmlFor='category' className='block text-sm font-medium text-gray-300'>
                      Phân Loại
                    </label>
                    <select
                      id='category' name='category' value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className='mt-1 block  bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    >
                      <option value=''>Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                </div>

                <div>
                    <label htmlFor='specific_category' className='block text-sm font-medium text-gray-300'>
                      Phân loại chi tiết
                    </label>
                    <select
                      id='specific_category' name='specific_category' value={newProduct.specific_category}
                      onChange={(e) => setNewProduct({ ...newProduct, specific_category: e.target.value })}
                      disabled={!newProduct.category}
                      className='mt-1 block  bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                    >
                      <option value=''>Select a specific category</option>
                          {specificOptions.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                          ))}
                    </select>
                </div>
          </div>

          <div className="subjectInput">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-300 mb-2">Đối tượng sử dụng</legend>

              <div>
                <input
                  type="checkbox"
                  id="select-all-subjects"
                  name="select-all"
                  checked={selectedSubjects.length === subjects.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSubjects(subjects); // select all
                    } else {
                      setSelectedSubjects([]); // deselect all
                    }
                  }}
                />
                <label htmlFor="select-all-subjects" className="ml-2 text-white">Tất Cả</label>
              </div>

              {subjects.map((subject) => (
                <div key={subject}>
                  <input
                    type="checkbox"
                    id={`subject-${subject}`}
                    name="subject"
                    value={subject}
                    checked={selectedSubjects.includes(subject)}
                    onChange={() => handleSubjectChange(subject)}
                  />
                  <label htmlFor={`subject-${subject}`} className="ml-2 text-white">{subject}</label>
                </div>
              ))}
            </fieldset>
          </div>


          <div className=" manufacturingCountryInput mb-4">
             <label htmlFor='manufacturing_country' className='block text-sm font-medium text-gray-300' >
                Nước Sản xuất 
             </label>
             <select
                id='manufacturing_country' name='manufacturing_country' value={newProduct.manufacturing_country}
                onChange={(e) => setNewProduct({ ...newProduct, manufacturing_country: e.target.value })}
                className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none   focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'  
             >
              <option value='' >Select a manufacturing country</option>
              {countries.map((country) => (
                <option key={country} value={country}  >
                  {country}
                </option>
              ))}
                

             </select>

          </div>

          <div className="requirePrescriptionInput" >
            <input
              type="radio"
              name="requirePrescription"
              id="dot-1"
              value="yes"
              checked={newProduct.requirePrescription === "yes"}
              onChange={(e) => setNewProduct({ ...newProduct, requirePrescription: e.target.value })}
            />
            <input
              type="radio"
              name="requirePrescription"
              id="dot-2"
              value="no"
              checked={newProduct.requirePrescription === "no"}
              onChange={(e) => setNewProduct({ ...newProduct, requirePrescription: e.target.value })}
            />

            <span className="block text-sm font-medium text-gray-300">Yêu cầu kê đơn</span>

                <div className="requirePrescriptionCategory flex w-[80%] mt-[14px] justify-between ">
                  {/* Label for Yes  */}
                  <label htmlFor="dot-1" className=" flex items-center cursor-pointer " >
                    <span className="dot one"></span>
                    <span >Có</span>
                  </label>
                  {/* Label for No  */}
                  <label htmlFor="dot-2" className=" flex items-center cursor-pointer " >
                    <span className="dot two"></span>
                    <span >Không</span>
                  </label>
                </div>
          </div>

          <div className='mt-1 flex items-center'>
              <input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
              <label
                htmlFor='image'
                className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500'
              >
                <Upload className='h-5 w-5 inline-block mr-2' />
                Upload Image
              </label>
              {newProduct.image && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
				  </div>

          <button
            type='submit'
            className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md  shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50'
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
                Loading...
              </>
            ) : (
              <>
                <PlusCircle className='mr-2 h-5 w-5' />
                Create Product
              </>
            )}
          </button>

      </form>

    </div>
  )
}

export default CreateProductForm