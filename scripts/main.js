import { world } from "mojang-minecraft";
world.events.beforeChat.subscribe(e => {
    e.sender.runCommand("say hi");
});
