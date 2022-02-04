import { numToCurrency } from "@/helpers/numToCurrency";
import Vue, { VueConstructor } from "vue";

export default function (instance: VueConstructor<Vue>) {
  instance.filter("currency", numToCurrency);
}
