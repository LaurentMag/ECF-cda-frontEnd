import {clientType} from "../type/clientType";
import {filterType} from "../type/filterType";
import {vehicleType} from "../type/vehicleType";

/**
 * It returns a random number
 * @returns A random number between 0 and 76877679878687
 */
export const randomNumber = () => {
  return Math.floor(Math.random() * 76877679878687);
};

// ------------------------------------------------------------------------------------------

/**
 * generate a price according to two dates and a base price.
 * With a check to verify if date selection arent incorrect for the price calculation
 * @param dateStart date in string coming from a date input value
 * @param dateEnd  date in string coming from a date input value
 * @param oneDayPrice base price use for calculation
 * @returns calculated price
 */
export const rentalPriceCalculation = (dateStartparam: string, dateEndparam: string, oneDayPrice: number) => {
  const dayConvert: number = 1000 * 60 * 60 * 24;
  const dateStart: Date = new Date(dateStartparam);
  const dateEnd: Date = new Date(dateEndparam);

  let price: number = 0;
  let getDayCount: number;

  getDayCount = Math.ceil(dateEnd.getTime() - dateStart.getTime()) / dayConvert;

  if (getDayCount > 0) {
    price = getDayCount * oneDayPrice;
  } else {
    console.log(" Séléction de date incorrect pour le calcul de prix ");
  }

  return price;
};

// ------------------------------------------------------------------------------------------

/**
 * filter the vehicle list coming from the "DB" to return a filtered list displaying only selected element
 * @param vehicleList vehicleList from state
 * @param filterObj filter object coming from filter component
 * @returns return the filtered vehicle list, if a filter was selected
 */
export const handlefilterVehicle = (vehicleList: vehicleType[], filterObj: filterType): vehicleType[] => {
  let filteredDataArr: vehicleType[] = [];

  if (vehicleList) {
    if (!filterObj || filterObj.searchfor == "") {
      filteredDataArr = vehicleList;
    } else {
      filteredDataArr = vehicleList.filter((vehicle) => {
        const attrValue: string | number | boolean = vehicle[filterObj.filter as keyof vehicleType];
        if (typeof attrValue === "string") {
          return attrValue.toLowerCase().includes(filterObj.searchfor.toLowerCase());
        } else if (typeof attrValue === "boolean") {
          const checkIn: boolean = ["disponible"].includes(filterObj.searchfor.toLowerCase());
          return attrValue === checkIn;
        }
      });
    }
  }
  return filteredDataArr;
};

// ------------------------------------------------------------------------------------------

/**
 * ilter the Client list coming from the "DB" to return a filtered list displaying only selected element
 * @param clientList client liste from state
 * @param filterObj filter object coming from filter component
 * @returns return the filtered cleint list, if a filter was selected
 */
export const handlefilterClient = (clientList: clientType[], filterObj: filterType): clientType[] => {
  let filteredDataArr: clientType[] = [];

  if (clientList) {
    if (!filterObj || filterObj.searchfor === "") {
      filteredDataArr = clientList;
    } else {
      filteredDataArr = clientList.filter((client) => {
        const attrValue: string | number = client[filterObj.filter as keyof clientType];

        if (typeof attrValue === "string") {
          return attrValue.toLowerCase().includes(filterObj.searchfor.toLowerCase());
        }
      });
    }
  }
  return filteredDataArr;
};
