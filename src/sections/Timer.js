function TimerMenu(props) {
  const menu = props.items.map((item) => {
    const key = Object.keys(item)[0];
    const firstLevel = <span>{key}</span>;
    const secondLevel = item[key].map((second) => <li>{second}</li>);

    return (
      <li className="">
        {firstLevel} 
        <ul>{secondLevel}</ul>
      </li>
    );
  });

  return <ul>{menu}</ul>;
}

function Timer() {
  const menuItems = [
    { "Pending Tasks": ["Today", "Tomorrow"] },
    { "Completed Tasks": ["Today", "Tomorrow"] },
  ];
  return (
    <div>
      <TimerMenu items={menuItems} />
      {/* <SubMenu items={["Today", "Tomorrow"]} /> */}
      {/* List of tasks */}
      <div>
        <ul>
          <li>task 1</li>
        </ul>
      </div>
    </div>
  );
}

export default Timer;
