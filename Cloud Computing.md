**Pros**:
* Allows for scalability in that if you need more hardware your can just get it without needing to purchase the new hardware and install it
* You do not need to worry about upkeep and physical storage for the hardware
* Allows for a centralized place where all of your services are kept and maintained
### Shared Responsibility Model
The responsibility is shared between the provider and the service user.
*Provider*:
* maintains the hardware, cooling, and upkeep of the physical hardware
* they maintain the buildings and space needed for the hardware
* networking is covered by the provider and the necessary internal and external connections and maintained
* patches for system software is covered by the provider as well as certain software depending on the packages used
*User*:
* the data that is being sent to and taken from the service used
* access security to that data

In most cases the provider is responsible for the hardware and software (depending on the package used) and the user is responsible for the data that is being send to and from the service as well as the security of that data.

### **IaaS**:
Infrastructure as a Service:
* gives the most power to the user but at the cost of less support from the provider
* Essentially, the user is given access to hardware and can do 'whatever' they want with it, within reason based on the package
* The only thing that the provider handles is the maintenance of the physical devices, the user handles everything else
*Provider Handles*: maintaining the hardware, network connectivity, and physical security
*User Handles*: Operating system, installation, configuration, maintenance, network configuration, database and storage configuration, etc.

**Where is it necessary**:
- Lift-and-shift migration: You’re setting up cloud resources similar to your on-prem datacenter, and then simply moving the things running on-prem to running on the IaaS infrastructure.
- Testing and development: You have established configurations for development and test environments that you need to rapidly replicate. You can start up or shut down the different environments rapidly with an IaaS structure, while maintaining complete control.

### **PaaS**:
Platform as a Service
* The user is given access to an OS which is maintained by the provider but can do whatever they want with the system.
* The most variable option in that the provider might offer to maintain certain services depending on the package like networking, applications, and directory infrastructure
*Provider Handles*: physical infrastructure, physical security, connection to the internet, operating systems, middleware, development tools, business intelligence services that make up the cloud solution.
*User Handles*: everything else

**Where is it necessary**:
- Development framework: PaaS provides a framework that developers can build upon to develop or customize cloud-based applications. Similar to the way you create an Excel macro, PaaS lets developers create applications using built-in software components. Cloud features such as scalability, high-availability, and multi-tenant capability are included, reducing the amount of coding that developers must do.
- Analytics or business intelligence: Tools provided as a service with PaaS allow organizations to analyze and mine their data, finding insights and patterns and predicting outcomes to improve forecasting, product design decisions, investment returns, and other business decisions.

### **SaaS**:
Software as a Service
* The provider provides a specific software and the user can use that software as they deem fit
* The user only need to worry about how the software is being used, not the background processes like networking or operating system maintenance
* This is the most common version used by average people

*Examples of SaaS*:
* Any fully developed application
* email
* financial software
* messaging application
* connectivity software

*User Handles*: the data, devices that connect to the service, users
*Provider Handles*: everything else

---

*When using a cloud provider, you’ll always be responsible for:*
- The information and data stored in the cloud
- Devices that are allowed to connect to your cloud (cell phones, computers, and so on)
- The accounts and identities of the people, services, and devices within your organization

*The cloud provider is always responsible for:*
- The physical datacenter
- The physical network
- The physical hosts

*Your service model will determine responsibility for things like:*
- Operating systems
- Network controls
- Applications
- Identity and infrastructure

### Cloud Models
**Cloud**: When something provides an IT service over the internet it is considered a Cloud Service
#### Private Cloud
This is the natural evolution of a datacenter. The infrastructure has used in a private company has just been moved to the cloud so the same people are still the only ones who can access it but now they can access it over the internet which has its benefits
#### Public Cloud
Similar functionality to a private cloud but the cloud infrastructure is maintained by a 3rd-party provider.
#### Hybrid Cloud
Maintains both a public and private cloud at the same time. Offers the most flexibility because you can choose where you want to keep your services

| **Public cloud** | **Private cloud** | **Hybrid cloud** |
| --- | --- | --- | 
| No capital expenditures to scale up | Organizations have complete control over resources and security | Provides the most flexibility |
| Applications can be quickly provisioned and deprovisioned | Data is not collocated with other organizations’ data | Organizations determine where to run their applications |
| Organizations pay only for what they use | Hardware must be purchased for startup and maintenance | Organizations control security, compliance, or legal requirements |
| Organizations don’t have complete control over resources and security | Organizations are responsible for hardware maintenance and updates |
#### Multi Cloud
Increasingly common. Essentially just use two (ore more) cloud services. This happens all the time because most groups or companies need to use a bunch of different services and everything isn't provided by the same provider. It does add complexity though when compared to being able to access all services through one provider.

### Consumption Based Model
**CapEx**
Capital Expense
Anything that is a one time purchase, often this is a physical thing like a building, a room, hardware, or materials used to maintain production.

**OpEx**
Operational Expense
Anything that is required for the continued operation of a service or product. This is usually things like software subscriptions, or reoccurring material expenses.
Cloud services are considered a OpEx because of they only change based on how much you use. If you need multiple servers and/or services you will pay more, but if you do not use any servers or services then you do not need to pay anything. They are a direct expense of the operation of company or group.

**Vertical Scaling**: Increasing in recourses to handle more complex commutations and handle and increased load from a similar user count.
**Horizontal Scaling**: Increasing the available recourses for an increased number of users.

