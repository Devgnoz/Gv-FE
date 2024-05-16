import { Link } from "react-router-dom";
import { Back, HomeXl } from "../icons/icon";
import { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

interface FormData {
  companyName: string;
  companyEmail: string;
  companyLogo: string;
  licenserName: string;
  licenserEmail: string;
  licenserPhno: string;
  licenserAddress: string;
  bankAccNum: string;
  ifsc_iban: string;
  currency: string;
}

const CreateLicensor: React.FC<Props> = () => {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    companyEmail: "",
    companyLogo: "",
    licenserName: "",
    licenserEmail: "",
    licenserPhno: "",
    licenserAddress: "",
    bankAccNum: "",
    ifsc_iban: "",
    currency: "",
  });

  const notify = () => {
    toast.success("Licensor created successfully!", { position: "top-center" });
  };
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("add licensor", formData);
      const response = await axios.post(
        "http://localhost:3000/add-licensor",
        formData
      );
      if (response.status === 200) {
        console.log("Data submitted successfully!");
        notify();
        setTimeout(() => {
          navigate("/licensor");
        }, 2000);
      } else {
        console.error("Failed to submit data.");
        notify();
        setTimeout(() => {
          navigate("/licensor");
        }, 2000);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Log the response data for more information
        console.error("Server responded with:", error.response.data);
        alert(`Error: ${error.response.data.message || "Conflict occurred"}`);
      } else {
        console.error("Error:", error);
      }
    }
  };
  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // After reading the file, set the base64 data to state
      setFormData({
        ...formData,
        companyLogo: reader.result ? reader.result.toString() : "",
      });
    };

    if (file) {
      // Read the file as data URL (base64)
      reader.readAsDataURL(file);
    }
  };

  const [bankFormat, setBankFormat] = useState("IFSC Code");

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-gray-100">
        <div className="pl-[34px]">
          <Link to="/licensor">
            <button className="flex gap-1 border font-medium text-sm border-gray-400 items-center rounded-lg px-3 py-2">
              <Back />
              Back
            </button>
          </Link>
        </div>

        <div className="flex flex-col mr-[34px] bg-white w-[95%] rounded-2xl h-[82%] m-[34px] my-[20px] pb-6">
          <h2 className="text-xl font-bold pl-[32px] pt-[20px]">
            Create Licensor
          </h2>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              1
            </p>
            <p className="font-bold">Licensor Details</p>
          </div>
          <div className="flex gap-4 pt-[10px] pl-[32px]">
            <div className="bg-gray-100 px-[10px] py-[10px] rounded-xl">
              <div className="bg-white rounded-lg p-2 border-2 border-dashed border-gray-300 flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mx-[24px] my-[10px]">
                  <HomeXl />
                  <label className="text-black font-medium text-sm">
                    Drop your logo here, or{" "}
                    <label className="cursor-pointer text-blue-500">
                      browse
                      <input
                        type="file"
                        accept="image/jpg, image/png"
                        name="companyLogo"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </label>
                </div>
                <p className="text-gray-500 text-xs">Supports JPG, PNG</p>

                {formData.companyLogo && (
                  <div className="w-16 h-16">
                    <img
                      src={formData.companyLogo}
                      alt="Company Logo"
                      className="max-w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-12">
              <div className="flex flex-col gap-2 w-[50svh]">
                <label htmlFor="" className="text-sm font-semibold">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[50svh]">
                <label htmlFor="" className="text-sm font-semibold">
                  Company Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="companyEmail"
                  value={formData.companyEmail}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              2
            </p>
            <p className="font-bold">Personal Details</p>
          </div>
          <div className="gap-4 pt-[16px] pl-[32px]">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Licenser Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  name="licenserName"
                  value={formData.licenserName}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  name="licenserEmail"
                  value={formData.licenserEmail}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
            <div className="flex items-center mt-6 gap-6">
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="licenserAddress"
                  value={formData.licenserAddress}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
              <div className="flex flex-col gap-2 w-[45%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  name="licenserPhno"
                  value={formData.licenserPhno}
                  onChange={handleChange}
                  className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                />
              </div>
            </div>
          </div>
          <div className="flex pl-[32px] pt-[20px] items-center gap-2">
            <p className="flex items-center justify-center bg-red-700 w-[20px] h-[20px] text-xs px-2 rounded-full text-white">
              3
            </p>
            <p className="font-bold">Bank Details</p>
          </div>
          <div className="gap-4 pt-[16px] pl-[32px]">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 w-[30%]">
                <label htmlFor="" className="text-sm font-semibold">
                  Select type of payment
                </label>
                <div className="flex gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="domestic"
                      name="paymentType"
                      value="domestic"
                      onClick={() => setBankFormat("IFSC Code")}
                    />
                    <label htmlFor="domestic">Domestic</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="international"
                      name="paymentType"
                      value="international"
                      onClick={() => setBankFormat("IBAN")}
                    />
                    <label htmlFor="international">International</label>
                  </div>
                </div>
              </div>{" "}
              <div className="flex gap-3">
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    Bank Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="Enter bank account number"
                    name="bankAccNum"
                    value={formData.bankAccNum}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    {bankFormat}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter ${bankFormat}`}
                    name="ifsc_iban"
                    value={formData.ifsc_iban}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  />
                </div>
                <div className="flex flex-col gap-2 w-[30%]">
                  <label htmlFor="" className="text-sm font-semibold">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="border-2 border-gray-300 text-sm rounded-md px-5 py-2"
                  >
                    <option value="INR">INR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end pr-[32px] pt-[20px]">
            <button
              type="submit"
              className="bg-black text-white font-semibold text-sm rounded-md px-5 py-2"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer theme="colored" />
    </form>
  );
};

export default CreateLicensor;
