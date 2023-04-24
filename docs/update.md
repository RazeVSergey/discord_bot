[toc]


#Discord bot

## info

A bot has been integrated that allows you to execute the following commands:

1. Update test benches

2. Stop updating previously running stands

##Command

### Update

/update `branch` `time`, where **branch** are active (maintained) branches; **time** - time in seconds after which the update will start

/update stop `branch` - allows you to stop a scheduled update on a specific branch


Full command example

For example, a request *@DB Administrator update on 23.07 and 22.12 please*, execute in turn:

```
/update master
/update stable
```

If you need to update immediately, then:

```
/update master 0
/update stable 0
```

**ATTENTION !!!**

> Update timeout 2 min


###Stop

If you suddenly need to cancel the update on **23.07**, then do:

```
/update stop master
```

### help

It is possible to get information on available commands by private message in discord
To do this, run the command:

```
/help
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
```