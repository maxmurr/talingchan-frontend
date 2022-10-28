import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ProductPayload } from "model/product_model";
import { useState } from "react";
import { render } from "react-dom";
import { useForm } from "react-hook-form";

const ProductCard: React.FC<ProductPayload> = (props: ProductPayload) => {
  const [selectQuantity, setSelectQuantity] = useState<number>(0);
  const [selectProduct, setSelectProduct] = useState<number>();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm();

  return (
    <>
      <form
        id="product_card"
        onSubmit={handleSubmit((e) => {
          setSelectProduct(props.id);
        })}
      >
        <Box
          sx={{
            "& > :not(style)": {
              width: {
                xs: "375px",
                md: "335px",
                lg: "400px",
                xl: "450px",
              },
              height: 620,
              borderRadius: 5,
            },
          }}
        >
          <Card elevation={3}>
            <CardMedia
              id="product_img"
              component="img"
              image={props.picture}
              sx={{ height: "280px", objectFit: "contain" }}
            />
            <Divider id="pic_detail_divider" sx={{ borderBottomWidth: 1 }} />
            <CardContent style={{ paddingTop: "10px" }}>
              <Typography
                id="product_name"
                gutterBottom
                component="div"
                sx={{
                  paddingTop: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  fontWeight: "650",
                  fontSize: "1.2rem",
                }}
              >
                {props.name}
              </Typography>
              <Typography
                id="product_description"
                variant="body2"
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {props.description}
              </Typography>
              <Typography
                id="product_price"
                variant="body1"
                color="text.secondary"
                sx={{
                  paddingTop: 1,
                  color: "#4caf50",
                  fontWeight: "750",
                }}
              >
                {props.price} BAHT
              </Typography>
              <Typography
                id="product_instock"
                variant="body2"
                color="text.secondary"
                sx={{
                  fontWeight: "750",
                }}
              >
                In Stock: {props.quantity} {props.unit} 
              </Typography>
            </CardContent>
            <Divider sx={{ borderBottomWidth: 1 }} />
            <CardActions>
              <div className="grid grid-cols-3 gap-x-5">
                <div className="px-1 col-span-2" id="product_total">
                  <InputLabel sx={{ fontSize: { xs: "10px", md: "12px" } }}>
                    In Stock {props.quantity} Unit
                  </InputLabel>
                  <Select
                    id="select_quantity"
                    autoWidth
                    displayEmpty
                    defaultValue="deselect"
                    sx={{
                      minWidth: "190px",
                      height: 34,
                      fontSize: { xs: "10px", md: "12px" },
                    }}
                    {...register("select_quantity", {
                      required: "Can not be empty",
                    })}
                    onChange={(e) => {
                      if(e.target.value == "deselect"){
                        setSelectQuantity(0);
                      }else{
                      setSelectQuantity(parseInt(e.target.value + 1));
                      }
                    }}
                  >
                    <MenuItem value={"deselect"}>
                      <em>None</em>
                    </MenuItem>
                    {Array.from(Array(props.quantity).keys()).map(
                      (item, index) => {
                        return (
                          <MenuItem key={index} value={index}>
                            {item + 1} Unit
                          </MenuItem>
                        );
                      }
                    )}
                  </Select>
                  <Typography
                    id="total_price"
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      pt: 1,
                      fontWeight: "750",
                    }}
                  >
                    TOTAL {props.price * selectQuantity} BAHT
                  </Typography>
                </div>
                <div className="flex items-end place-content-end">
                  <Button
                    id="submit_button"
                    type="submit"
                    variant="contained"
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "#4caf50",
                    }}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </CardActions>
          </Card>
        </Box>
      </form>
    </>
  );
};

export default ProductCard;