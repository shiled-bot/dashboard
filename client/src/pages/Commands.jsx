import { useState } from "react";
import Input from "components/Builders/Input";
import Divider from "components/Builders/Divider";

const commands = [
  {
    name: "ping",
    description: "Tests bot ping and response time",
    category: "info",
  },
  {
    name: "clear",
    description: "Deletes a number of messages in text channel. default 50",
    options: "[number_of_messages] [filter_by_user] [filter_by_role]",
    examples: [
      "number_of_messages:10",
      "filter_by_role:@Muted",
      "number_of_messages:10-filter_by_user:abood",
    ],
    category: "mod",
  },
  {
    name: "ban",
    description: "✈️ Bans a member",
    options: "<member> [reason] [days] [alert_member]",
    examples: ["member:@Corto", "member:@Corto-reason:hate speech"],
    category: "mod",
  },
  {
    name: "unban",
    description: "Unbans a member from the guild",
    options: "<user_id> [reason]",
    examples: [
      "user_id:697194915352019035",
      "user_id:697194915352019035-reason:apologized for what happened",
    ],
    category: "mod",
  },
  {
    name: "kick",
    description: "Kicks a member",
    options: "<member> [reason]",
    examples: ["member:@Corto", "member:@Corto-reason:Spamming"],
    category: "mod",
  },
  {
    name: "warn",
    description: "⚠️ Warns a member",
    options: "<warn> <reason>",
    examples: ["member:@Corto-reason:Spamming"],
    category: "mod",
  },
  {
    name: "warn_remove",
    description:
      "Remove a server warning or all warnings for the server or a member",
    options: "[id] [filter_by_user]",
    examples: ["", "filter_by_user:@Corto"],
    category: "mod",
  },
];

const Command = ({ command: { name, description, options, examples } }) => {
  const [active, setActive] = useState(false);

  const requiredOptions = [];

  options = options?.split(" ").map((option, i) => {
    if (option.startsWith("<") && option.endsWith(">"))
      requiredOptions.push(option.slice(1, option.length - 1));

    return <span key={i}>{option}</span>;
  });

  examples = examples?.map((example, i) => {
    return (
      <div
        key={i}
        className="ml-2 flex items-center flex-wrap gap-1 text-white-200 text-sm"
      >
        <div className="flex items-center mr-1">
          <span className="text-white-300 font-bold text-xl">/</span>
          <span className="font-medium">{name}</span>
        </div>

        {example.split("-").map((option, i) => {
          const colonIndex = option.indexOf(":");

          return (
            <div key={i} className="bg-nav p-1 rounded-sm">
              <span className="text-white-400">
                {option.slice(0, colonIndex + 1)}
              </span>
              <span className="font-medium">
                {option.slice(colonIndex + 1)}
              </span>
            </div>
          );
        })}
      </div>
    );
  });

  const toggleActiveHandler = () => setActive(!active);

  return (
    <div className="w-full">
      <div
        className={
          "pl-4 p-2 border border-nav bg-[#2f3136] cursor-pointer hover:bg-[#36383d] transition-colors" +
          (active ? " border-b-transparent" : "")
        }
        onClick={toggleActiveHandler}
      >
        <div className="flex flex-wrap text-white-100 text-lg">
          <span className="text-white-300 font-bold">/</span>
          <span className="font-medium">{name}</span>
          {requiredOptions.length > 0 && (
            <div className="ml-2 flex gap-2 text-white-300">
              {requiredOptions.map((option, i) => (
                <span key={i}>{option}</span>
              ))}
            </div>
          )}
        </div>
        <div className="text-white-200 mt-1">{description}</div>
      </div>

      {active && (
        <div className="bg-[#1b1c1f] p-3 py-6">
          <div>
            <h3 className="text-white-200 text-base font-medium">Usage:</h3>
            <div className="flex pl-2 text-white-200 text-lg mt-2">
              <span className="text-white-300 font-bold text-xl">/</span>
              <span className="font-medium">{name}</span>
              <div className="ml-2 flex items-center flex-wrap gap-1 text-white-300 text-base">
                {options}
              </div>
            </div>
          </div>
          {examples && (
            <div className="mt-5">
              <h3 className="text-white-200 text-base font-medium">
                Example{examples > 1 ? "s" : ""}:
              </h3>
              <div className="flex flex-col gap-2 pl-2 text-white-200 text-lg mt-2">
                {examples}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};;

const Category = ({ active, text, onClick }) => {
  return (
    <div
    className={
      "cursor-pointer p-2 px-3 rounded-sm  hover:opacity-80 " +
      (active
        ? "bg-blue cursor-default pointer-events-none"
        : "bg-inputs-bg cursor-pointer"
      )
    }
    onClick={onClick}
  >
    { text }
  </div>
  )
};

const CommandsPage = () => {
  const [query, setQuery] = useState(null);
  const [category, setCategory] = useState(null);

  const targetCommands = commands
    .filter((cmd) => (category ? cmd.category === category : cmd))
    .filter((cmd) => query ? (cmd.name.includes(query) || cmd.description.toLowerCase().includes(query)) : cmd);

  const searchHandler = ({ target: input }) => setQuery(input.value.trim().toLowerCase());
  const filterByCategoryHandler = (category) => setCategory(category);

  return (
    <div className="container mt-14 mx-auto cursor-default p-4">
      <div>
        <div className="flex items-center justify-center text-white-100 text-4xl md:text-5xl">
          <span className="mr-2 text-white-300 font-bold text-5xl md:text-6xl">
            /
          </span>
          Commands
        </div>
        <div className="mt-8">
          <Input
            placeholder="Search for a command 🔍"
            className="rounded"
            onKeyUp={searchHandler}
          />
        </div>
        <div className="flex justify-center md:justify-start gap-3 mt-6 transition-colors text-white-100 text-lg select-none">
          <Category
            active={!category}
            text="All"
            onClick={filterByCategoryHandler.bind(null, null)}
          />
          <Category
            active={category === "info"}
            text="Info"
            onClick={filterByCategoryHandler.bind(null, "info")}
          />
          <Category
            active={category === "mod"}
            text="Moderaion"
            onClick={filterByCategoryHandler.bind(null, "mod")}
          />
        </div>
      </div>
      <Divider />

      <div className="flex flex-col gap-8">
        {targetCommands.map((cmd, i) => (
          <Command key={i} command={cmd} />
        ))}
      </div>

    </div>
  );
};

export default CommandsPage;
