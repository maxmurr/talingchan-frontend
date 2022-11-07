import CustomAppBar from "components/common/custom_app_bar";
import type { NextPage } from "next";
import AddCustomerForm from "components/customer/add_customer_form";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";

const AddCustomer: NextPage = (props) => {
  const router = useRouter();
  const [backdrop, setBackdrop] = useState<boolean>(false);

  return (
    <>
      <div className="bg-white">
        <div className="w-full">
          <CustomAppBar
            id={"addCustomerBar"}
            button={[
              {
                buttonTitle: "Receive",
                onClick: (e) => {
                  e.preventDefault();
                  setBackdrop(true);
                  router.push("/receive/");
                },
              },
              {
                buttonTitle: "Cart",
                onClick: (e) => {
                  e.preventDefault();
                  setBackdrop(true);
                  router.push("/cart/");
                },
              },
              {
                buttonTitle: "Report",
                onClick: (e) => {
                  setBackdrop(true);
                },
              },
            ]}
          />
          <div className="pt-44"></div>
          <AddCustomerForm />
        </div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer - 1 }}
          open={backdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </>
  );
};

export default AddCustomer;
