import { MdOutlineFilterList, MdAddBox } from "react-icons/md";

const Input = ({ searchFilter }) => {
  return (
    <div className="search-box">
      <input
        type="search"
        name="search"
        id="search"
        placeholder="Search tasks"
        onChange={searchFilter}
      />
    </div>
  );
};

const DropDown = ({
  sortDescending,
  setSortDescending,
  selectFilter,
  name,
}) => {
  const options = {
    priority: {
      values: ["low", "medium", "high"],
    },
    status: { values: ["pending", "completed"] },
    dueDate: {
      values: ["today", "thisWeek", "nextWeek", "previousWeek"],
      textValues: ["today", "this week", "next week", "previous week"],
    },
  };
  return (
    <div className="dropdown-box">
      {name == "priority" && (
        <div className={sortDescending ? "filter-icon rotate" : "filter-icon"}>
          <MdOutlineFilterList
            onClick={() => {
              setSortDescending((prev) => !prev);
            }}
          />
        </div>
      )}

      <select name="filter" onChange={selectFilter} data-name={name}>
        <option value="">{name}</option>

        {options[name].values.map((item, index) => {
          return (
            <option value={item} key={item}>
              {options[name].textValues?.[index] || item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export { Input, DropDown };
