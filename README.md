# rpg-js

https://github.com/simondevyoutube/Quick_3D_RPG


## MMO - Client
MmoGame -> onCommit -> startGame -> NetworkController ->
    io.onConnect -> emit login.commit

## MMO - Server
WorldServer     -> constructor
                    -> LoginQueue -> set onLogin
                    -> io.onConnection -> queue.add -> LoginClient of SocketWrapper
                -> run -> update

SocketWrapper -> io.onAny -> onMessage
LoginClient     -> set onLogin
                -> set onMessage
                -> FSM -> LoginAwaitState

MMO -> emit login.commit ->
    SocketWrapper -> onAny -> fsm.onMessage
