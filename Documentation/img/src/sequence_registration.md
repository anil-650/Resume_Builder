```plantuml
@startuml

!$cs_activate_1 = "FFC299"
!$cs_activate_2 = ""
!$bs_activate_1 = "99E699"
!$bs_activate_2 = "33CC33"
!$db_activate_1 = "A366FF"
!$db_activate_2 = "FF3399"

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

title Myresumebuilder - Sequence diagram\n Registration page 

legend top left
  Data flow considering
  all systems are online 
end legend

actor User as A
participant "Astro (client server)" as CS
participant "Express (backend server)" as BS
database Postgresql as DB

A -> CS : Visits website
activate CS #$cs_activate_1

note left
  user wants to register with website
end note
CS --> A : Display Home page
deactivate CS

A -> CS : Clicks Sign up
activate CS #$cs_activate_1

CS --> A : Display Register page
deactivate CS

A ->> CS : Enter email
A ->> CS : Enter Full name
A ->> CS : Enter password
A -> CS : HitsRegister
activate CS #$cs_activate_1

CS -> BS : makes api call to register endpoint
activate BS #$bs_activate_1

BS -> DB : Query email
activate DB #$db_activate_1

DB -> BS : Query results
deactivate DB

alt#Gold #LightBlue email doesn't exists 
  BS -> BS : Encrypt_password()
  activate BS #$bs_activate_2
  
  BS -> DB -- : Query : newUser()
  activate DB #$db_activate_1
  DB -> DB : Create UUID for user
  activate DB #$db_activate_2

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
    
    CS --> A : Set Authorization cookies
    
  else #Pink error
    BS --> CS : "<font color=red>500: Server error</font>"
    CS --> A : Redirect 500 error page
  end
else #Pink email exists
  BS --> CS : "<font color=red>401: User all ready exists !!!</font>"
  deactivate BS
  CS --> A : show error "User already exists"
 
end 

CS -> A : redirect to dashboard
deactivate CS 

A --> CS ++#$cs_activate_1 : Send cookies in header
CS -> BS ++#$bs_activate_1 : Set and send token as header
BS -> BS ++#$bs_activate_2 : Check token validity

alt#Gold #LightBlue token is valid
BS -> BS : Extract UUID from token
BS -> DB --++#$db_activate_1 : Qurey User data 
DB --> BS -- : Qurey results
BS --> CS : "<font color=blue>200 OK</font>"

note right
  Sending user
  dashboard
  related data
end note

else #Pink token is invalid\n /malformed\n /expired
BS --> CS -- : "<font color=red>403 forbidden</font>"
CS -> A : Show 403 error page
end

CS -> A -- : Show dashboard page
note left
  User has successfully registered
end note

@enduml
```

![registration page](https://www.planttext.com/api/plantuml/png/XLPjKnit4FwkNx6OpfGqPKBiXXayn1Di367QqjGE_TGPHdUts1hBqaNI0Kwc_xsxEf-jCv1yigLzU_RjqNtmGRfGBRKGUp_b_bRcGTtBWBTluJrqBYv6tPEJpeweooA-p7RrJqx6nxL-jglVwur6lHwBYcp7wgntV7nniIlgrW1wFNOeJdrOQHm8eN66flWcCfalPivMfiYjjgw_GgtjWxYp9dZr5VlT8x6KRgPCltSaIbaKoipuxtz211KqVajKtz7jwPicGXJ3dok7lbfYLYbTe8D3cEAN2asEK2WvStBvhu49pfGFJWPb3PHoXj00X61Bq7WN1C2v31Bk21tardX5tWWBtKkjmQzymAK7wH2iqSgG2pQllGX1vR0ERZmXa1xEA1CNLAvAQG8LZc9RECYrGZgIpZswLnrM74tRckF7ajBnSC1bO_-fyd0g2eAOIO_moVem8zKlcYNdGo7Eu710_g0F_oYlWeS7pEWNHTCf5kwtPqS8OqcmphzYz0-4mrDLmCMQyOqAyuqpniGsWfmTKi0pYdUkVAdb2ZxQ9SRgYWAJe2cqaLRvmiDKpGnKvVUXFHDXqc1wASewpDYm4Ywbqa-lBohgfv5BV2egfVSFrXK9uezKoYRiZ_4Eg4baj9GBf5af5UGyF6argO2bLIPiVGtPLzRsDOo-peVaw-yAtMgToyQ69Flj1HM2xfhujGqlXWu-hHCFYjHX_zBg0lR_KBDv6EeAQ_TGMFJcvm3uI5Wzq4WCjpcDJUvMPRXjQdJmYbVZnIIw9DquO6Y76rnzCFZ0gz9syKnE07LIiH0ZXwnsStDr3dUqR3oktxNlYhO3PSWYS70gJSvjXZZBuBWE48j2Lm1NrzFnv7DRiLwFMrNykZtm42N7MCJal9aclfcCFzzChg-kB-4NEc_M2A3TdHhmytryghjxtcdjfKCquAkSA2M26DOhnOFTWLCcLeYi_3wZ8HXqZuxwyDVlfszOCEX4YsrzuX68a29f4Zd5YoIHs6-0P6sd6E2i2dFhrDUQUtDh5mfzeusQg6p_ap8BGEUismK9dHIamsBmZZ5E8odM9YsqIUm95egQ5u0iQisQD29aaGQEer-FlFX1zD-EtlRN94zhJVDOh9fbsTlRIw0aZI7MRW7pStfWQa2TjQlK4Lb7actuX4rSamiHII7zFBEIfgf5Vn3vhmR--lKEDyLMaCzrzMaHO4uXQNqsdCKssHER03A-GKtB-QrPMmvVikpogiunNwnDxgLMXGghvucdrb6-LXCftppIWqqvr_lkx78zTGcZSEZsLmglZCDLtID-B45izsbDGInlLkh5RZSBaUw3Q2q3LvI-3neQslO5oBicE4K4i7qnqw7RfArCJ9o-KTuifIPQMs8yu6D9BIyIW17zCnFPOpBCL56WsI3TZiwKfusLaXM87ooDIdGRjJOPr5hfbq4ivvoQJrp2P797J-XgywOHp6sIGdoW0tse_Wy0)
