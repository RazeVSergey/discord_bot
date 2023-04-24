## info

A bot has been integrated that allows you to execute the following commands:

1. Update test benches

2. Stop updating previously running stands

##Command

### Update

Two environments are available for updating:

**master**

```
/update master
```

**stable**

```
/update stable
```

In this case, the update will start after 2 minutes.

ATTENTION!!!

> if you want to update without waiting, you need to add the argument **0**

For example:

```
/update master 0
```


###Stop

If you want to cancel the update of **master** or **stable**, then run:

```
/update stop master
```

or

```
/update stop stable
```

##Settings

Create a bot in this [section](https://discord.com/developers/applications)
In the *BOT* menu -> Create a new token

Change **token** in **config.json** to your own

Specify the ip address, as well as the login and password of the host where we will update

## Build

Building a project is easy. Run:

```
docker-compose build
```

## Deploy and run

Launch of the project:

```
docker-compose up -d