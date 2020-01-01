import * as chai from "chai";
const expect = chai.expect;

import { getDuedate } from "../src/schedule_util";
import { BranchCalendar } from "../src/model";
let branchSchedule: BranchCalendar[];

describe("Test The getDueDate then return due date in the same day", () => {
  let branchSchedule: BranchCalendar[] = [
    { open: false, open_at: "", close_at: "" }, // sunday
    { open: true, open_at: "09:00", close_at: "18:00" }, // monday
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "17:00" },
    { open: false, open_at: "", close_at: "" }
  ];
  it("should return date in the same day given date 2019-12-30T10:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T10:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T13:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date in the same day given date 2019-12-30T13:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T13:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T16:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date in the same day given date 2019-12-30T07:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T07:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T12:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date in the same day given date 2019-12-30T04:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T04:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T12:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
});

describe("Test the getDueDate then return tommrow deadline", () => {
  let branchSchedule: BranchCalendar[] = [
    { open: false, open_at: "", close_at: "" }, // sunday
    { open: true, open_at: "09:00", close_at: "18:00" }, // monday
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "18:00" },
    { open: true, open_at: "09:00", close_at: "17:00" },
    { open: false, open_at: "", close_at: "" }
  ];
  it("should return date in the next day given date 2019-12-30T18:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T18:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-31T12:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });

  it("should return date in the next day given date 2019-12-30T16:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T16:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-31T10:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date in the next day given date 2019-12-30T17:00:00+0800", () => {
    let requestDate = new Date("2019-12-30T17:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-31T11:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date in the next day given date 2019-12-30T17:30:00+0800", () => {
    let requestDate = new Date("2019-12-30T17:30:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-31T11:30:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
});

describe("Test The getDueDate then return due date on Monday", () => {
  let branchSchedule: BranchCalendar[] = [
    { open: false, open_at: "", close_at: "" }, // sunday
    { open: true, open_at: "09:30", close_at: "18:30" }, // monday
    { open: true, open_at: "09:30", close_at: "18:30" },
    { open: true, open_at: "09:30", close_at: "18:30" },
    { open: true, open_at: "09:30", close_at: "18:30" },
    { open: true, open_at: "09:30", close_at: "18:30" },
    { open: false, open_at: "", close_at: "" }
  ];

  it("should return date on Monday given date 2019-12-28T04:00:00+0800", () => {
    let requestDate = new Date("2019-12-28T04:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T12:30:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });

  it("should return date on Monday given date 2019-12-27T19:00:00+0800", () => {
    let requestDate = new Date("2019-12-29T04:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T12:30:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date on Monday given date 2019-12-27T18:00:00+0800", () => {
    let requestDate = new Date("2019-12-27T18:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T12:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date on Monday given date 2019-12-27T16:00:00+0800", () => {
    let requestDate = new Date("2019-12-27T16:00:00+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T10:00:00+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
  it("should return date on Monday given date 2019-12-27T16:00:01+0800", () => {
    let requestDate = new Date("2019-12-27T16:00:01+0800");
    let dueDuate = getDuedate(requestDate, branchSchedule);
    let expectedDate = new Date("2019-12-30T10:00:01+0800");
    expect(dueDuate.getTime()).to.be.equal(expectedDate.getTime());
  });
});
