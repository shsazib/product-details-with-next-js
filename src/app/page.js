"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  // Constants and Static Data
  const colorOptions = [
    { color: "#816BFF", name: "purple", image: "/product-image-1.webp" },
    { color: "#1FCEC9", name: "cyan", image: "/product-image-2.webp" },
    { color: "#4B97D3", name: "blue", image: "/product-image-3.webp" },
    { color: "#3B4747", name: "black", image: "/product-image-4.webp" },
  ];

  const discountAmount = 20;
  const sizes = [
    { label: "S", price: 89 },
    { label: "M", price: 99 },
    { label: "L", price: 109 },
    { label: "XL", price: 119 },
  ];

  // Derived Data
  const sizesWithDiscount = sizes.map((size) => ({
    ...size,
    discountPrice: size.price - discountAmount,
  }));

  // State Management
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(sizesWithDiscount[0]);
  const [counter, setCounter] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  // Reference for Modal
  const modalRef = useRef(null);

  // Event Handlers for Color and Size Selection
  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Quantity Adjustment Handlers
  const increment = () => {
    setCounter(counter + 1);
  };

  const decrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    }
  };

  // Modal Control Handlers
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Click Outside Modal Close Effect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isModalOpen]);

  // Add to Cart Handler
  const addToCart = () => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.name === "Classy Modern Smartwatch" &&
        item.color === selectedColor.name &&
        item.size === selectedSize.label
    );

    let updatedCartItems = [...cartItems];

    if (existingItemIndex >= 0) {
      updatedCartItems[existingItemIndex].quantity += counter;
      updatedCartItems[existingItemIndex].totalPrice =
        updatedCartItems[existingItemIndex].price *
        updatedCartItems[existingItemIndex].quantity;
    } else {
      const newCartItem = {
        name: "Classy Modern Smartwatch",
        image: selectedColor.image,
        color: selectedColor.name,
        size: selectedSize.label,
        quantity: counter,
        price: selectedSize.discountPrice,
        totalPrice: selectedSize.discountPrice * counter,
      };
      updatedCartItems.push(newCartItem);
    }

    setCartItems(updatedCartItems);
    setCartCount(updatedCartItems.length);
    setTotalPrice(
      updatedCartItems.reduce((sum, item) => sum + item.totalPrice, 0)
    );

    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  // Render Method
  return (
    <section className="py-20">
      <div className="w-full xl:container mx-auto px-6">
        {/* Product Display Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-[60px]">
          {/* Product Image */}
          <div className="flex-1">
            <Image
              className="w-full"
              src={selectedColor.image}
              alt="Product Image"
              width={1000}
              height={1000}
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex-1">
            <h1 className="text-3xl xl:text-[40px] pb-3">
              Classy Modern Smartwatch
            </h1>
            <div className="flex items-center gap-2 pb-5">
              <div className="flex items-center gap-1">
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4633 7.75627C16.374 7.48702 16.1438 7.28827 15.8625 7.24627L15.8588 7.24552L11.5845 6.62077L9.67275 2.74777C9.53475 2.51602 9.285 2.36377 9 2.36377C8.715 2.36377 8.466 2.51602 8.3295 2.74402L8.32725 2.74777L6.4155 6.62077L2.14125 7.24552C1.776 7.30027 1.5 7.61152 1.5 7.98802C1.5 8.19877 1.587 8.38852 1.7265 8.52502L4.8195 11.5378L4.08975 15.7925C4.083 15.8308 4.07925 15.8743 4.07925 15.9193C4.07925 16.3333 4.41525 16.6693 4.82925 16.6693C4.95675 16.6693 5.0775 16.637 5.1825 16.5808L5.17875 16.583L9.00075 14.5723L12.8228 16.583C12.924 16.637 13.044 16.6693 13.1723 16.6693C13.5863 16.6693 13.9223 16.3333 13.9223 15.9193C13.9223 15.8743 13.9185 15.8308 13.911 15.788L13.9118 15.7925L13.182 11.5378L16.275 8.52502C16.4145 8.38852 16.5015 8.19877 16.5015 7.98802C16.5015 7.90552 16.488 7.82527 16.4633 7.75102L16.4648 7.75627H16.4633Z"
                    fill="#FFD200"
                  />
                </svg>
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4633 7.75627C16.374 7.48702 16.1438 7.28827 15.8625 7.24627L15.8588 7.24552L11.5845 6.62077L9.67275 2.74777C9.53475 2.51602 9.285 2.36377 9 2.36377C8.715 2.36377 8.466 2.51602 8.3295 2.74402L8.32725 2.74777L6.4155 6.62077L2.14125 7.24552C1.776 7.30027 1.5 7.61152 1.5 7.98802C1.5 8.19877 1.587 8.38852 1.7265 8.52502L4.8195 11.5378L4.08975 15.7925C4.083 15.8308 4.07925 15.8743 4.07925 15.9193C4.07925 16.3333 4.41525 16.6693 4.82925 16.6693C4.95675 16.6693 5.0775 16.637 5.1825 16.5808L5.17875 16.583L9.00075 14.5723L12.8228 16.583C12.924 16.637 13.044 16.6693 13.1723 16.6693C13.5863 16.6693 13.9223 16.3333 13.9223 15.9193C13.9223 15.8743 13.9185 15.8308 13.911 15.788L13.9118 15.7925L13.182 11.5378L16.275 8.52502C16.4145 8.38852 16.5015 8.19877 16.5015 7.98802C16.5015 7.90552 16.488 7.82527 16.4633 7.75102L16.4648 7.75627H16.4633Z"
                    fill="#FFD200"
                  />
                </svg>
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.4633 7.75627C16.374 7.48702 16.1438 7.28827 15.8625 7.24627L15.8588 7.24552L11.5845 6.62077L9.67275 2.74777C9.53475 2.51602 9.285 2.36377 9 2.36377C8.715 2.36377 8.466 2.51602 8.3295 2.74402L8.32725 2.74777L6.4155 6.62077L2.14125 7.24552C1.776 7.30027 1.5 7.61152 1.5 7.98802C1.5 8.19877 1.587 8.38852 1.7265 8.52502L4.8195 11.5378L4.08975 15.7925C4.083 15.8308 4.07925 15.8743 4.07925 15.9193C4.07925 16.3333 4.41525 16.6693 4.82925 16.6693C4.95675 16.6693 5.0775 16.637 5.1825 16.5808L5.17875 16.583L9.00075 14.5723L12.8228 16.583C12.924 16.637 13.044 16.6693 13.1723 16.6693C13.5863 16.6693 13.9223 16.3333 13.9223 15.9193C13.9223 15.8743 13.9185 15.8308 13.911 15.788L13.9118 15.7925L13.182 11.5378L16.275 8.52502C16.4145 8.38852 16.5015 8.19877 16.5015 7.98802C16.5015 7.90552 16.488 7.82527 16.4633 7.75102L16.4648 7.75627H16.4633Z"
                    fill="#FFD200"
                  />
                </svg>
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.982 7.87254C16.9377 7.73829 16.8222 7.63854 16.6812 7.61754H16.679L12.2097 6.96429L10.2237 2.94129C10.1825 2.70729 10.0362 2.51454 9.83598 2.41104L9.83223 2.40879C9.73548 2.36004 9.62148 2.33154 9.50073 2.33154C9.20748 2.33154 8.95398 2.49954 8.83023 2.74479L8.82798 2.74929L6.91623 6.62154L2.64198 7.24629C2.27673 7.30104 2.00073 7.61229 2.00073 7.98879C2.00073 8.19954 2.08773 8.38929 2.22723 8.52579L5.32023 11.5385L4.59048 15.7933C4.58373 15.8315 4.57998 15.875 4.57998 15.92C4.57998 16.334 4.91598 16.67 5.32998 16.67C5.45748 16.67 5.57823 16.6378 5.68323 16.5815L5.67948 16.5838L9.85098 14.39C9.92448 14.348 9.98673 14.2963 10.0392 14.2363L10.04 14.2355L13.8732 16.2515C13.9235 16.2785 13.9842 16.2943 14.048 16.2943C14.255 16.2943 14.423 16.1263 14.423 15.9193C14.423 15.8968 14.4207 15.875 14.417 15.854V15.8563L13.6535 11.4065L16.8867 8.25654C16.9565 8.18829 17 8.09304 17 7.98804C17 7.94679 16.9932 7.90704 16.9812 7.87029L16.982 7.87329V7.87254ZM12.9882 11.0068C12.9177 11.075 12.8742 11.171 12.8742 11.276C12.8742 11.2978 12.8765 11.3195 12.8795 11.3405V11.3383L13.5477 15.233L10.19 13.4668L9.82323 13.0078L9.49923 4.77429L9.68373 3.55254L11.624 7.47129C11.678 7.58004 11.7815 7.65804 11.9037 7.67604H11.906L15.8187 8.24754L12.9882 11.0068Z"
                    fill="#FFD200"
                  />
                </svg>
                <svg
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.1715 16.6692C13.044 16.6692 12.9233 16.637 12.8183 16.5815L12.822 16.5837L9.00002 14.573L5.17802 16.5837C5.07677 16.6377 4.95677 16.67 4.82852 16.67C4.41452 16.67 4.07852 16.334 4.07852 15.92C4.07852 15.875 4.08227 15.8315 4.08977 15.7887L4.08902 15.7932L4.81877 11.5385L1.72577 8.52573C1.58627 8.38924 1.49927 8.19948 1.49927 7.98873C1.49927 7.61298 1.77602 7.30098 2.13677 7.24698L2.14127 7.24623L6.41552 6.62148L8.32727 2.74923C8.46527 2.51748 8.71502 2.36523 9.00002 2.36523C9.28502 2.36523 9.53402 2.51748 9.67052 2.74548L9.67277 2.74923L11.5845 6.62223L15.8588 7.24698C16.224 7.30173 16.5 7.61298 16.5 7.98948C16.5 8.20023 16.413 8.38998 16.2735 8.52648L13.1805 11.5392L13.9103 15.794C13.917 15.8322 13.9208 15.8765 13.9208 15.9207C13.9208 16.3347 13.5855 16.6692 13.1715 16.6692ZM9.00002 12.9755C9.12752 12.9755 9.24827 13.007 9.35327 13.0632L9.34952 13.061L12.1755 14.5475L11.6363 11.402C11.6295 11.3637 11.6258 11.3195 11.6258 11.2752C11.6258 11.0652 11.712 10.8747 11.8515 10.7382L14.139 8.51073L10.9778 8.04873C10.7288 8.01123 10.5233 7.85673 10.416 7.64298L10.4138 7.63848L9.00002 4.77498L7.58627 7.63848C7.47677 7.85598 7.27127 8.01123 7.02677 8.04798L7.02227 8.04873L3.86102 8.51073L6.14852 10.7382C6.28802 10.8747 6.37502 11.0645 6.37502 11.2752C6.37502 11.3202 6.37127 11.3645 6.36377 11.4065L6.36452 11.402L5.82527 14.5475L8.65127 13.061C8.75252 13.007 8.87252 12.9755 9.00002 12.9755Z"
                    fill="#FFD200"
                  />
                </svg>
              </div>
              <div className="flex items-center">(2 Reviews)</div>
            </div>
            {/* Price Section */}
            <div className="flex items-center gap-1 pb-5">
              <del className="text-xl">${selectedSize.price.toFixed(2)} </del>
              <p className="text-primary text-2xl font-bold">
                ${selectedSize.discountPrice.toFixed(2)}
              </p>
            </div>

            <p className="text-lg pb-5">
              I must explain to you how all this mistaken idea of denouncing
              pain was born and I will give you a complete account of the
              system.
            </p>

            {/* Color Selection */}
            <div className="pb-5">
              <p className="text-lg font-bold text-dark pb-2.5">Band Color</p>
              <div id="colorOptions" className="flex items-center gap-5">
                {colorOptions.map((option) => (
                  <span
                    key={option.name}
                    data-color={option.name}
                    onClick={() => handleColorChange(option)}
                    className={`cursor-pointer border-2 rounded-full flex items-center justify-center`}
                    style={{
                      borderColor:
                        selectedColor.name === option.name
                          ? option.color
                          : "transparent",
                    }}
                  >
                    <span
                      className="w-5 h-5 inline-block rounded-full m-1"
                      style={{ backgroundColor: option.color }}
                    />
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="pb-5">
              <p className="text-lg font-bold text-dark pb-2.5">Wrist Size</p>
              <div
                className="flex flex-wrap items-center gap-3 text-dark"
                id="sizeContainer"
              >
                {sizesWithDiscount.map((size) => (
                  <div
                    key={size.label}
                    onClick={() => handleSizeChange(size)}
                    className={`px-5 py-2 border inline-flex items-center gap-1 rounded cursor-pointer ${
                      selectedSize.label === size.label
                        ? `border-primary text-primary`
                        : `border-border text-dark`
                    }`}
                  >
                    <span className="font-bold">{size.label}</span>
                    <span className="text-xs">${size.discountPrice}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center border border-border rounded">
                <button
                  className="p-2 border-r hover:bg-slate-50 transition duration-300"
                  onClick={decrement}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-minus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M5 12l14 0" />
                  </svg>
                </button>
                <span className="px-6 text-dark">{counter}</span>
                <button
                  className="p-2 border-l hover:bg-slate-50 transition duration-300"
                  onClick={increment}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M12 5l0 14" />
                    <path d="M5 12l14 0" />
                  </svg>
                </button>
              </div>
              <button className="btn-primary" onClick={addToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Button */}
        <div className="w-fit mx-auto mt-20 lg:mt-28">
          <button className="btn-secondary space-x-2.5" onClick={openModal}>
            <span>Checkout</span>
            <span className="bg-white rounded px-1.5 py-1 text-xs">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Cart Modal */}
        {isModalOpen && (
          <div className="w-full h-full fixed top-0 left-0 bg-dark/20 flex items-center justify-center">
            <div
              ref={modalRef}
              className="bg-white rounded-2xl p-5 sm:p-10 mx-4 w-xl overflow-x-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between pb-5">
                <h5 className="text-2xl">Your Cart</h5>
                <button
                  onClick={closeModal}
                  className="bg-border/50 hover:bg-border p-1 rounded-full transition duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icon icon-tabler icons-tabler-outline icon-tabler-x"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M18 6l-12 12" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ">
                <div className="min-w-[400px] max-h-[70vh]">
                  {cartItems.length === 0 ? (
                    <div className="text-center">Your cart is empty.</div>
                  ) : (
                    <table className="checkout-table">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Color</th>
                          <th>Size</th>
                          <th>Quantity</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index}>
                            <td className="flex flex-col sm:flex-row sm:items-center gap-2">
                              <Image
                                className="w-9 h-9 rounded"
                                src={item.image}
                                alt={item.name}
                                width={50}
                                height={50}
                                priority
                              />
                              <p>{item.name}</p>
                            </td>
                            <td>{item.color}</td>
                            <td className="font-bold">{item.size}</td>
                            <td className="font-bold">{item.quantity}</td>
                            <td className="font-bold">
                              ${item.price.toFixed(2)}
                            </td>
                          </tr>
                        ))}

                        {/* Total Row */}
                        <tr>
                          <td colSpan="3" className="text-right font-bold">
                            Total:
                          </td>
                          <td className="text-sm font-bold">
                            {cartItems.reduce(
                              (totalItems, item) => totalItems + item.quantity,
                              0
                            )}
                          </td>
                          <td className="text-lg font-bold">
                            $
                            {cartItems
                              .reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              )
                              .toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )}

                  {/* Cart Actions */}
                  {cartItems.length === 0 ? null : (
                    <div className="flex justify-end items-center gap-6 py-6">
                      <button className="btn-outline-tertiary">
                        Continue Shopping
                      </button>
                      <button className="btn-primary">Checkout</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification Container */}
        <ToastContainer />
      </div>
    </section>
  );
}
