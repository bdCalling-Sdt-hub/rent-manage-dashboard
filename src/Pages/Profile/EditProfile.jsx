/* eslint-disable no-unused-vars */
import { Button, ConfigProvider, Form, Input, Typography, Upload } from "antd";

import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { AllImages } from "../../../public/images/AllImages";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";

import {
  useEditProfileMutation,
  useUserProfileQuery,
} from "../../Redux/api/userApi";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { profileData } = location.state || {};
  console.log("profileData", profileData);

  const { refetch } = useUserProfileQuery();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageUrl = getImageUrl();
  const [updateProfile, { isLoading }] = useEditProfileMutation();

  const handleImageChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = async (values) => {
    console.log("onfinish", values);
    navigate("/profile");
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("phone", values.phone);
    formData.append("address", values.address);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        toast.success("Profile updated successfully!");

        // refetch();
        navigate("/profile", { state: { updated: true } });
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-8">
              <div className="mt-12 flex items-center  gap-x-4">
                <div className="mt-12  relative ">
                  <div className="rounded-full w-fit border-2 border-secondary-color overflow-hidden">
                    {profileData?.image ? (
                      <img
                        className="h-40 w-40 relative"
                        src={`${imageUrl}/${profileData.image}`}
                        alt="Profile"
                      />
                    ) : (
                      <img
                        className="h-40 w-40 relative"
                        src={profileData.image}
                        alt="Profile"
                      />
                    )}
                  </div>
                  <Form.Item name="image" className="text-white ">
                    <Upload
                      maxCount={1}
                      listType="picture"
                      beforeUpload={handleImageChange}
                      accept="image/*"
                      multiple={false}
                    >
                      <div className="absolute h-5 lg:h-10 w-10 left-[110px] inset-0 top-8 xl:-top-11 md:top-10 flex items-center justify-center rounded-full opacity-100 cursor-pointer border border-gray-400 hover:bg-white">
                        <EditOutlined
                          style={{ color: "#f5382c", fontSize: "25px" }}
                        />
                      </div>
                    </Upload>
                  </Form.Item>
                </div>
                <p className="text-5xl font-semibold">
                  {profileData?.fullName}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-white mt-5">
            <div className="p-4 w-full">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profileData?.email}
                name="email"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="email"
                  disabled
                  placeholder="Enter your email"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Full Name
              </Typography.Title>
              <Form.Item
                initialValue={profileData?.fullName}
                name="fullName"
                className="text-white"
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Enter your Name"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
                />
              </Form.Item>
              {profileData?.address && (
                <>
                  <Typography.Title level={5} style={{ color: "#222222" }}>
                    Address
                  </Typography.Title>
                  <Form.Item
                    initialValue={profileData?.address}
                    name="address"
                    className="text-white"
                  >
                    <Input
                      suffix={<MdOutlineEdit />}
                      placeholder="Enter your address"
                      className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                    />
                  </Form.Item>
                </>
              )}
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact number
                </Typography.Title>
                <Form.Item
                  initialValue={profileData?.phone}
                  name="phone"
                  className="text-white"
                >
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter your Contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
              <Form.Item>
                <Button
                  className="w-full py-6 border !border-[#222021] hover:border-[#222021] text-xl !text-primary-color bg-[#222021] hover:!bg-[#222021] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Save & Change
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;
