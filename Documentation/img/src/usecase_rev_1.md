```plantuml
@startuml
!theme plain
title Myresumebuilder Use Case Diagram

left to right direction

actor Actor 
package Myresumebuilder{
usecase "visit" as uc1
usecase "register" as uc2
usecase "Login" as uc3
usecase "create resume" as uc4
usecase "download resume" as uc5

Actor --> uc1
Actor --> uc2
Actor --> uc3
Actor --> uc4
Actor --> uc5

@enduml
```
![usecase revision fig-1](https://www.planttext.com/api/plantuml/png/PP3DRW8n38JlVWgpTmxyz8f0SAJ7Fe2Rc62HJLQE0whwyjqkAoqhBYFDVDROyhuOgTKsmiAkt39saII1YKN6pn_bKbl-hX8zAtuLnYFrSX8AIYr0v8kXPLG9LqCloiua9m1obXKFWq97xaRXhUyNQc7ttzVSfOWrI0MhMqsnSf1Yh2DPJ-ISWwGntaonKoPZVAuPyNR2FZzIpEJd0ny0pqENozsm_zMjPsupSzkPwslsd7p_opy0)