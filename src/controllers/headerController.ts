import { makeObservable, computed } from "mobx";
import { appStore } from "@/stores/appStore";

export class HeaderController {
  private store = appStore;

  constructor() {
    makeObservable(this, {
      privateBooksCount: computed,
    });
  }

  get privateBooksCount() {
    return this.store.privateBooksCount;
  }
}
