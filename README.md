# Asuna - Discord Bot for the NanaSubs Server

**Asuna** is a custom **Discord** bot, written in **Discord.js v14**. It uses a **MongoDB** database to store server-specific configurations. It was created for the **nanasubs.com.pl** community server and is inspired by the Sword Art Online theme.

The bot's main purpose is to automate and simplify user management on the server.

## Main Features

### Welcome and Farewell System
The bot automatically welcomes each new user by sending a personalized welcome card as an image and an embedded message with useful links on a dedicated channel. When a user leaves the server, Asuna posts a themed farewell message. These features are fully automated after the initial setup.

### Automatic Role Assignment
New server members can automatically receive a predefined role, which makes permission management easier. (This functionality is implemented but temporarily disabled in the code).

### Server Configuration
Administrators can easily manage the bot's features using simple `/setup` commands:

* `/setup welcome_channel` Is used to set the channel where welcome messages will appear.
* `/setup leave_channel` Sets the channel for farewell messages.
* `/setup welcome_role` Defines the role that will be automatically assigned to new users.

### Additional Tools
The bot also offers helper commands for testing and content creation:

* `/create embed [standard|nanasubs]` Allows for the quick creation and sending of custom embedded messages (embeds).
* `/test [join|leave|connection]` Enables administrators to test the bot's key features, such as welcome/farewell messages or response time.
