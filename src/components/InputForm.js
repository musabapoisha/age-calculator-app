import React, { useState } from "react";
import icon from "../assets/images/icon-arrow.svg";
import { useDispatch } from "react-redux";
import { update } from "../redux/dateSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";

export default function InputForm() {
  const dayTest = (y, m) => new Date(y, m, 0).getDate();
  const [monthTest, setMonthTest] = useState({ years: "", months: "" });
  const maxNumLength = (e, changeValue) => {
    if (e.target.value.length > e.target.maxLength) {
      e.target.value = e.target.value.slice(0, e.target.maxLength);
    }
    changeValue(e);
    if (e.target.name === "months") {
      setMonthTest({ ...monthTest, months: e.target.value });
    } else if (e.target.name === "years") {
      setMonthTest({ ...monthTest, years: e.target.value });
    }
  };
  const yearNow = new Date();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      days: "",
      months: "",
      years: "",
    },
    onSubmit: (values) => {
      dispatch(
        update({
          values,
        })
      );
    },
    validationSchema: Yup.object({
      days: Yup.number()
        .max(dayTest(monthTest.years, monthTest.months), "Must be a valid date")
        .required("This field is required")
        .positive()
        .integer(),
      months: Yup.number()
        .min(1, "This field is required")
        .max(
          yearNow.getFullYear() === Number(monthTest.years) &&
            yearNow.getMonth() <= Number(monthTest.months)
            ? yearNow.getMonth() + 1
            : 12,
          "Must be a valid month in past"
        )
        .required("This field is required")
        .positive()
        .integer(),
      years: Yup.number()
        .required("This field is required")
        .positive()
        .integer()
        .max(yearNow.getFullYear(), "This field is required"),
    }),
  });
  return (
    <>
      <Box rounded="md" w="100%">
        <form onSubmit={formik.handleSubmit}>
          <HStack spacing={4}>
            <FormControl isInvalid={formik.errors.days ? true : false}>
              <FormLabel
                htmlFor="days"
                className={formik.errors.days ? "input-error" : ""}
              >
                Day
              </FormLabel>
              <Input
                id="days"
                name="days"
                type="number"
                onChange={(e) => maxNumLength(e, formik.handleChange)}
                value={formik.values.days}
                className={
                  formik.values.days && formik.errors.days ? "input-error" : ""
                }
                maxlength="2"
                placeholder="DD"
              />
              <FormErrorMessage className="absolute">
                {formik.errors.days}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.months ? true : false}>
              <FormLabel
                htmlFor="months"
                className={formik.errors.months ? "input-error" : ""}
              >
                Month
              </FormLabel>
              <Input
                id="months"
                name="months"
                type="number"
                onChange={(e) => maxNumLength(e, formik.handleChange)}
                value={formik.values.months}
                className={formik.errors.months ? "input-error" : ""}
                maxlength="2"
                placeholder="MM"
              />

              <FormErrorMessage className="absolute">
                {formik.errors.months}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.years ? true : false}>
              <FormLabel
                htmlFor="years"
                className={formik.errors.years ? "input-error" : ""}
              >
                Year
              </FormLabel>
              <Input
                id="years"
                name="years"
                type="number"
                onChange={(e) => maxNumLength(e, formik.handleChange)}
                value={formik.values.years}
                className={formik.errors.years ? "input-error" : ""}
                maxlength="4"
                placeholder="YYYY"
              />

              <FormErrorMessage className="absolute">
                {formik.errors.years}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              colorScheme="purple"
              width="full"
              disabled={formik.isSubmitting}
            >
              <img src={icon} alt="Submit" />
            </Button>
          </HStack>
        </form>
      </Box>
    </>
  );
}
