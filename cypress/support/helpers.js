import { faker } from "@faker-js/faker";

export function getRandomNumber() {
  return faker.number.bigInt();
}

export function getRandonEmail() {
  return faker.internet.email({ firstName: "qa-tester-" });
}
