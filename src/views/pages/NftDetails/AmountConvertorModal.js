import { getContract } from "src/utils";
import {
  Dialog,
  DialogActions,
  DialogContent,
  Box,
  Button,
  Typography,
  IconButton,
  FormControl,
  TextField,
} from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { GiCancel } from "react-icons/gi";
import WrappedABI from "src/constants/ABI/WrappedABI.json";
import { ethers } from "ethers";
import ButtonCircularProgress from "src/component/ButtonCircularProgress";
import { toast } from "react-toastify";

export default function AmountConvertorModal({
  classes,
  open,
  handelClose,
  currency,
  userWalletBalnce,
  orderDetails,
  price,
  getUserWalletBalance,
}) {
  const [amount, setAmount] = useState("");
  const { account, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState(false);
  const depositeHandler = async () => {
    if (Number(account) > 0) {
      setIsLoading(true);
      try {
        const contractApp = getContract(currency, WrappedABI, library, account);
        console.log("contractApp", contractApp);
        const res = await contractApp.deposit({
          from: account,
          value: ethers.utils.parseEther(amount.toString()),
        });
        await res.wait();
        setIsLoading(false);
        toast.success("Added successfully");
        getUserWalletBalance();
        handelClose();
      } catch (error) {
        console.log("ERROR", error);
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    setAmount(price);
  }, [price]);

  return (
    <>
      <Dialog
        fullWidth='xs'
        maxWidth='xs'
        open={open}
        onClose={() => handelClose()}
        aria-labelledby='max-width-dialog-title'
        disableBackdropClick={isLoading}
        disableEscapeKeyDown={isLoading}
      >
        <DialogActions>
          <IconButton
            onClick={() => handelClose()}
            className={classes.customizedButton}
            disabled={isLoading}
          >
            <GiCancel />
          </IconButton>
        </DialogActions>
        <DialogContent className={classes.dialogContent1}>
          <Typography variant='h2' className='modalTitle'>
            {orderDetails?.currencyName === "BNB" && "Add WBNB"}
            {orderDetails?.currencyName === "ETH" && "Add WETH"}
          </Typography>

          <Box>
            <label style={{ fontSize: "16px" }}>BNB Price</label>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                placeholder='0.124'
                value={amount}
                type='number'
                helperText={
                  Number(amount) > Number(userWalletBalnce) &&
                  `Please neter valid amount, Amount should be less then wallet balance, Your wallet balance is ${userWalletBalnce} ${orderDetails?.currencyName}`
                }
                error={Number(amount) > Number(userWalletBalnce)}
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value && e.target.value != "-") {
                    setAmount(Math.abs(Number(e.target.value)));
                  } else {
                    setAmount("");
                  }
                }}
                inputProps={{ readOnly: isLoading }}
              />
            </FormControl>
          </Box>
          <Box textAlign={"center"} mt={2} mb={2}>
            <BsArrowDownCircle style={{ fontSize: 36 }} />
          </Box>
          <Box>
            <label style={{ fontSize: "16px" }}>WBNB Price</label>
            <FormControl fullWidth className={classes.margin}>
              <TextField
                placeholder='0.124'
                value={amount}
                type='number'
                onKeyPress={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                onChange={(e) => {
                  if (e.target.value && e.target.value != "-") {
                    setAmount(Math.abs(Number(e.target.value)));
                  } else {
                    setAmount("");
                  }
                }}
              />
            </FormControl>
          </Box>

          <Box align='center' className='modal_button_div' mt={4}>
            <Button
              onClick={depositeHandler}
              variant='contained'
              color='secondary'
              size='large'
              mb={2}
              disabled={isLoading}
            >
              Submit {isLoading && <ButtonCircularProgress />}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
