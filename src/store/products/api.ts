import { Product } from "@/models/Product";
import { api } from "../axios";
import { FetchListPayload } from "./types";

export function fetchProducts(payload: FetchListPayload = {}) {
  return api.get<Product[]>("v3/2bf99f55-9faa-446d-a09d-749c4f8857af", {
    params: payload,
  });
}
