import {clientType} from "../type/clientType";
import {vehicleType} from "../type/vehicleType";

class DataServices {
  fetchData = (url: string) => {
    return fetch(url).then((res) => res.json());
  };

  postData = (url: string, data: clientType | vehicleType) => {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
    }).then((res) => res.json());
  };

  putData = (url: string, id: number, data: clientType | vehicleType) => {
    return fetch(`${url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application-json"},
    }).then((res) => res.json);
  };

  patchData = (url: string, id: number, data: any) => {
    return fetch(`${url}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {"Content-Type": "application/json"},
    }).then((res) => res.json());
  };

  deleteData = (url: string, id: number) => {
    return fetch(`${url}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json);
  };
}

export const dataServices = Object.freeze(new DataServices());
