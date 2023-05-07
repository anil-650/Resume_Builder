```plantuml
@startuml

<style>

legend{
backgroundcolor:yellow
fontsize:20
margin:30
padding:30
}

title{
fontsize:25
}
</style>

title Myresumebuilder-Sequence diagram

legend top left
  Registration page:
  data flow considering all systems are online 
end legend

actor User as A
participant "Astro (client server)" as CS
participant "Express (backend server)" as BS
database Postgresql as DB

A -> CS : Visits website
activate CS #FFC299

note left
  user wants to register with website
end note
CS --> A : Display Home page
deactivate CS

A -> CS : Clicks Sign up
activate CS #FFC299

CS --> A : Display Register page
deactivate CS

A ->> CS : Enter email
A ->> CS : Enter Full name
A ->> CS : Enter password
A -> CS : HitsRegister
activate CS #FFC299

CS -> BS : makes api call to register endpoint
activate BS #99E699

BS -> DB : Query email
activate DB #FF3399

DB -> BS : Query results
deactivate DB

alt#Gold #LightBlue email doesn't exists 
  BS -> BS : Encrypt_password()
  activate BS #33CC33
  
  BS -> DB -- : Query : newUser()
  activate DB #A366FF
  DB -> DB : Create UUID for user
  activate DB #FF3399

  DB -> DB : insert new record
  note right #Gold
    INSERT new record
    user_id,
    user_name,
    user_email,
    user_password
    RETURNING *
  end note
  deactivate DB
  DB --> BS : Query results
  deactivate DB
  deactivate DB
  alt#Gold #LightGreen sucess
    BS --> CS :" <font color=blue>200: OK</font>"
    note right
      send token
    end note
  else #Pink error
    BS --> CS : "<font color=red>500: Server error</font>"
  end
else #Pink email doesn't exist
  BS -> CS : 401: User all ready exists !!!
end
CS --> A : redirect to dashboard
@enduml
```
![rgistration page](https://www.planttext.com/api/plantuml/png/TLNRKjim47tNLop9Gw5JXXGNPl3G3Ba2qvRI1FhAAFPYD94bLv89ATD_xww3WyFbATxRsRCNRKvya2wKkHRYs8UbnguG6ZCqwQEOoMIUELkQDB7QkdY9Mjk5kBKcUFKNu_sEoANBb8cZZYXacYgJyUS_8O8A6XyRhWUaFTwhCrHc-B5qwCiSPwNIARhTAVufqIG8gPAPatdD188jGEDj400Jp9GFJWPb3HGomvYKgGmIReaR9DPuHLZ41AJMu9S-OEv1EWHhj388WX5Nm4B895W7rnuTI0yzgi85bQX2cW2j7YMoi9reXIIIppswdHOx3gQRdgE7WahniCqjO_ocStygcE1CUeHBwqD6hdyqMuPz8NgmsoKyYE6tyYfuME2CVf6fgNiPa8tjyNYmVtGaXB6aU6f5oQmNbDzJWy1LZM6D2dTh4ER2CO90TYbHZ_8CbI-qNCAPpR5geKYnaQn9QQ1LClSmLPc1idYRqXl8avhBU-XFy2F3JfXBfL-hnoNDpyWSNviAwVt2khJ1z8nQLwTzdsUNXa7EkPmZxKIX8E4bQNQF6bPOPS8p1aMqZuv6XupHhp26VSBuLQ9RFd5V-vA5yaKH-z9tdM_boykkWs_sWnT0wj0-jJg5zdULtOM-Bd452wb5Rpu4m0VYve56td-kOMGIjop2JTsBxHsoRv2Eei4WYaYx3cHAksi-CHXSyEflXd8DlUZmS3mcxQg8gk21GpPVNvyFuPOU3Q_VoxYwzer0PSWpS39gGS9ZWsedmN6zK1LFAe3pY-beShNfk5hp6vL-UXPuAHfYrQo6lDuEran6LzUJY_EBK_X8ylevqCtOcCAAyDlpUktxKdunmbE7QC2N2Ps4YaH_zKHuKLjmp4SHgelwTKR3xkvtEZ7y_7QynuPkgufuxayb0XsKwWxISQaKZK9GqrrfNoep1tJEkfSPeTNCw33j7d32QNMXLY6Dr7mLcuYl5t6zJHNubyxd-Eb-qakY5KcNzRvkRMtn_MaU2CgkQBI1drmg_TtCIfhJ2NdHFz1_)