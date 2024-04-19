let playerInventory = [];
class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // Replace "Title goes here" with the actual story title from storyData
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // Replace "Home" with the actual initial location from storyData
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        
        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                if (choice.Target === "Secret Room with Key,Secret Room without Key") {
                    // Modify target dynamically based on player inventory
                    choice.Target = playerInventory.includes("bronze_key") ? "Secret Room with Key" : "Secret Room without Key";
                }
                this.engine.addChoice(choice.Text, choice);
            }
        } else {
            this.engine.addChoice("The end.");
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("> " + choice.Text);
            if (choice.Target === "Kitchen with key") {
                // If the player picks up the key, add it to their inventory
                playerInventory.push("bronze_key");
                
            }
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}


class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
