# Topology Manager - Visual Architecture Guide

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER INTERFACE LAYER                               │
│                         (React + TypeScript + Tailwind)                      │
│                                                                              │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐│
│  │ Dashboard │  │ Discovery │  │  Network  │  │ Analysis  │  │Monitoring││
│  │  Module   │  │  Module   │  │  Module   │  │  Module   │  │  Module  ││
│  └───────────┘  └───────────┘  └───────────┘  └───────────┘  └──────────┘│
│        ↓              ↓              ↓              ↓              ↓        │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │              Common Components & Shared Services                    │    │
│  │         (Layout, Navigation, State Management, Utilities)           │    │
│  └────────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                          HTTP/REST + WebSocket
                                       │
┌──────────────────────────────────────┴──────────────────────────────────────┐
│                            API GATEWAY LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  Authentication │ Authorization │ Rate Limiting │ Request Routing   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
        ┌──────────────────────────────┼──────────────────────────────┐
        │                              │                              │
        ↓                              ↓                              ↓
┌──────────────────┐        ┌──────────────────┐        ┌──────────────────┐
│   DISCOVERY      │        │   MONITORING     │        │    PROTOCOL      │
│    SERVICE       │        │    SERVICE       │        │   INGESTION      │
│                  │        │                  │        │    SERVICE       │
│ • Network Scan   │        │ • Metric Poll    │        │ • LLDP/CDP       │
│ • Device Probe   │        │ • Alert Engine   │        │ • IS-IS/OSPF     │
│ • Credential     │        │ • Performance    │        │ • BGP            │
│ • Classification │        │ • Health Check   │        │ • Correlation    │
└────────┬─────────┘        └────────┬─────────┘        └────────┬─────────┘
         │                           │                           │
         └───────────────────────────┼───────────────────────────┘
                                     │
┌────────────────────────────────────┴─────────────────────────────────────┐
│                          DATA PERSISTENCE LAYER                           │
│                                                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌────────────┐  │
│  │ PostgreSQL/  │  │ Time-Series  │  │    Redis     │  │Elasticsearch│ │
│  │    MySQL     │  │   Database   │  │   (Cache)    │  │   (Logs)   │  │
│  │ (Topology)   │  │  (Metrics)   │  │  (Session)   │  │  (Search)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  └────────────┘  │
└───────────────────────────────────────────────────────────────────────────┘
                                     │
┌────────────────────────────────────┴─────────────────────────────────────┐
│                    NETWORK INFRASTRUCTURE LAYER                           │
│                                                                           │
│  Switches │ Routers │ Firewalls │ Load Balancers │ Servers │ IoT │ Cloud│
│                                                                           │
│  Protocols: SNMP, SSH, Telnet, WMI, REST APIs, NETCONF, Cloud APIs      │
└───────────────────────────────────────────────────────────────────────────┘
```

---

## Module Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        DISCOVERY TO VISUALIZATION                        │
└─────────────────────────────────────────────────────────────────────────┘

    ┌──────────────────┐
    │  User Initiates  │
    │  Discovery Scan  │
    └────────┬─────────┘
             │
             ↓
    ┌────────────────────┐
    │  Discovery Wizard  │ ──→ Collects: Seeds, Credentials, Options
    └────────┬───────────┘
             │
             ↓
    ┌────────────────────┐
    │ Discovery Service  │ ──→ Parallel device probing
    │  • Ping Sweep      │     • SNMP queries
    │  • SNMP Query      │     • Classification
    │  • Fingerprinting  │
    └────────┬───────────┘
             │
             ↓
    ┌────────────────────────┐
    │  Protocol Ingestion    │ ──→ Discovers links between devices
    │  • LLDP/CDP           │     • Layer 2 connectivity
    │  • IS-IS/OSPF/BGP     │     • Layer 3 routing
    └────────┬───────────────┘
             │
             ↓
    ┌────────────────────────┐
    │   Topology Builder     │ ──→ Creates relationship graph
    │  • Link Correlation    │     • Calculates dependencies
    │  • Role Assignment     │     • Determines hierarchy
    └────────┬───────────────┘
             │
             ↓
    ┌────────────────────────┐
    │   Data Persistence     │ ──→ Stores in database
    │  • Devices             │     • Topology
    │  • Interfaces          │     • Metrics
    │  • Links               │
    └────────┬───────────────┘
             │
             ↓
    ┌────────────────────────┐
    │   Visualization        │ ──→ Renders for user
    │  • Network Map         │     • Device List
    │  • Geographic Map      │     • Dashboard Stats
    └────────────────────────┘
```

---

## Component Hierarchy

```
App
│
├─── Layout
│    │
│    ├─── Header
│    │    ├─── Logo
│    │    ├─── Search Bar
│    │    ├─── Notifications (with badge)
│    │    └─── User Menu
│    │
│    ├─── Sidebar
│    │    └─── Navigation Menu
│    │         ├─── Dashboard
│    │         ├─── Discovery
│    │         ├─── Network
│    │         ├─── Analysis
│    │         ├─── Monitoring
│    │         └─── Settings
│    │
│    └─── Content Area
│         │
│         ├─── Dashboard
│         │    ├─── StatsCard (x4)
│         │    ├─── DeviceStatusChart
│         │    ├─── RecentEvents
│         │    └─── QuickActions
│         │
│         ├─── Discovery
│         │    └─── DiscoveryWizard
│         │         ├─── Step 1: Seeds
│         │         ├─── Step 2: Expansion
│         │         ├─── Step 3: Credentials
│         │         ├─── Step 4: Options
│         │         └─── Step 5: Review
│         │
│         ├─── Network
│         │    ├─── DeviceList
│         │    ├─── EnhancedNetworkMap
│         │    └─── TopologyDiagram
│         │
│         ├─── Analysis
│         │    ├─── PathAnalysis
│         │    ├─── ReachabilityAnalysis
│         │    ├─── NetworkTrafficAnalysis
│         │    └─── NetworkProtocolIngestion
│         │
│         ├─── Monitoring
│         │    ├─── PerformanceDashboard
│         │    ├─── WirelessNetworkMonitor
│         │    ├─── ApplicationPerformanceMonitor
│         │    ├─── CloudResourcesMonitor
│         │    └─── LogManagement
│         │
│         └─── Settings
│              ├─── CredentialsManager
│              ├─── ConfigurationManager
│              ├─── Device Roles
│              ├─── Dependencies
│              └─── Schedules
│
└─── Modals & Overlays
     ├─── DeviceDetails
     ├─── MapView
     ├─── GeotaggingManager
     └─── Various Wizards
```

---

## Data Flow: Discovery Process

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DISCOVERY DATA FLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

USER INPUT                    PROCESSING                      DATABASE
    │                            │                                │
    │  Seed Devices             │                                │
    │  (IPs, ranges)            │                                │
    ├──────────────────────────→│                                │
    │                            │                                │
    │  Credentials              │                                │
    │  (SNMP, SSH)              │                                │
    ├──────────────────────────→│                                │
    │                            │  Ping Sweep                   │
    │                            ├──────────┐                    │
    │                            │          │                    │
    │                            │←─────────┘                    │
    │                            │  Live Devices                 │
    │                            │                                │
    │                            │  SNMP Query                   │
    │                            ├──────────┐                    │
    │                            │          │                    │
    │                            │←─────────┘                    │
    │                            │  Device Info                  │
    │                            │  (Vendor, Model, OS)          │
    │                            │                                │
    │                            │  Classify by OID              │
    │                            ├──────────┐                    │
    │                            │          │                    │
    │                            │←─────────┘                    │
    │                            │  Device Role                  │
    │                            │                                │
    │                            │  Extract Interfaces           │
    │                            ├──────────┐                    │
    │                            │          │                    │
    │                            │←─────────┘                    │
    │                            │  Interface List               │
    │                            │                                │
    │                            │  Store Device                 │
    │                            ├───────────────────────────────→│
    │                            │                                │
    │  Results                  │  Query Saved Data              │
    │←──────────────────────────┤←───────────────────────────────┤
    │                            │                                │
```

---

## Protocol Ingestion Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      PROTOCOL INGESTION FLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

LAYER 2 DISCOVERY (LLDP/CDP)
    │
    │  Query LLDP MIB
    ├────────────────→ Device A ───→ Returns neighbors
    │                      │              • Chassis ID
    │                      │              • Port ID
    │                      │              • System Name
    │                      │
    ├────────────────→ Device B ───→ Returns neighbors
    │                      │
    └────────────────→ Device C ───→ Returns neighbors
                           │
                           ↓
                  ┌─────────────────┐
                  │  Link Builder   │
                  │  • Correlate    │
                  │  • Deduplicate  │
                  │  • Calculate    │
                  │    Confidence   │
                  └────────┬────────┘
                           ↓
LAYER 3 DISCOVERY (OSPF/IS-IS/BGP)
    │
    │  Query Routing MIBs
    ├────────────────→ Router A ───→ Returns neighbors
    │                      │              • Neighbor ID
    │                      │              • Interface
    │                      │              • Metric
    │                      │
    ├────────────────→ Router B ───→ Returns neighbors
    │                      │
    └────────────────→ Router C ───→ Returns neighbors
                           │
                           ↓
                  ┌─────────────────┐
                  │  Topology Map   │
                  │  • Routing      │
                  │    relationships│
                  │  • Path costs   │
                  │  • Areas/ASes   │
                  └────────┬────────┘
                           ↓
                  ┌─────────────────┐
                  │   Combined      │
                  │   Topology      │
                  │  • L2 Links     │
                  │  • L3 Routing   │
                  │  • External     │
                  └─────────────────┘
```

---

## Monitoring Data Collection

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      MONITORING DATA COLLECTION                          │
└─────────────────────────────────────────────────────────────────────────┘

Scheduled Polling (every 5 minutes)
         │
         ↓
┌─────────────────────┐
│  Device Monitor     │
│  Poller Service     │
└──────────┬──────────┘
           │
           ├───────────────────────────────────┐
           │                                   │
           ↓                                   ↓
  ┌─────────────────┐              ┌─────────────────┐
  │  SNMP Collector │              │  SSH Collector  │
  │  • CPU usage    │              │  • Config       │
  │  • Memory       │              │  • Version      │
  │  • Interfaces   │              │  • Routes       │
  │  • Temperature  │              │  • Status       │
  └────────┬────────┘              └────────┬────────┘
           │                                │
           └────────────┬───────────────────┘
                        │
                        ↓
              ┌──────────────────┐
              │  Data Processor  │
              │  • Normalize     │
              │  • Calculate Δ   │
              │  • Detect issues │
              └────────┬─────────┘
                       │
       ┌───────────────┼───────────────┐
       │               │               │
       ↓               ↓               ↓
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Time-Series │ │   Alerting  │ │   Frontend  │
│  Database   │ │   Engine    │ │  Dashboard  │
│             │ │             │ │             │
│ • Metrics   │ │ • Thresholds│ │ • Graphs    │
│ • History   │ │ • Rules     │ │ • Alerts    │
│ • Trends    │ │ • Actions   │ │ • Tables    │
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## Path Analysis Algorithm

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PATH ANALYSIS FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

USER INPUT: Source Device A → Destination Device B
     │
     ↓
┌──────────────────────────────────┐
│  Load Topology Graph             │
│  • All devices                   │
│  • All links                     │
│  • Link status                   │
│  • Link speeds                   │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Apply Filters                   │
│  • Exclude down links?           │
│  • VLAN filter                   │
│  • Max hops                      │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Dijkstra's Algorithm            │
│  • Find shortest path            │
│  • Calculate cost/latency        │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Find Alternative Paths          │
│  • ECMP paths                    │
│  • Redundant paths               │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Rank Paths                      │
│  • By hop count                  │
│  • By latency                    │
│  • By bandwidth                  │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Extract Path Details            │
│  • Hop-by-hop devices            │
│  • Interface per hop             │
│  • Latency per hop               │
└────────────┬─────────────────────┘
             │
             ↓
┌──────────────────────────────────┐
│  Render Path Diagram             │
│  Device A → Switch1 → Router1    │
│         → Router2 → Device B     │
└──────────────────────────────────┘

Example Output:
┌──────────┐    GigE0/1    ┌──────────┐    GigE0/24   ┌──────────┐
│ Device A │─────────────→ │ Switch-1 │─────────────→│ Router-1 │
└──────────┘  10ms, 1Gbps  └──────────┘  5ms, 1Gbps   └──────────┘
                                                             │
                                                       GigE0/1
                                                        15ms, 10Gbps
                                                             ↓
                           ┌──────────┐    GigE0/5    ┌──────────┐
                           │ Device B │←──────────────│ Router-2 │
                           └──────────┘  8ms, 1Gbps   └──────────┘

Total: 4 hops, 38ms latency, Bottleneck: 1Gbps links
```

---

## Geographic Mapping Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                       GEOGRAPHIC MAPPING FLOW                            │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐
│  Device without  │
│  Location Data   │
└────────┬─────────┘
         │
         ↓
┌───────────────────────────────────────────┐
│  Location Discovery Methods               │
│                                           │
│  1. SNMP Location Field                   │
│     └→ Query sysLocation MIB              │
│        "Building A, Floor 2, NY"          │
│                                           │
│  2. IP Geolocation                        │
│     └→ MaxMind/IP2Location lookup         │
│        Approximate location               │
│                                           │
│  3. DNS PTR Records                       │
│     └→ Reverse DNS lookup                 │
│        ny-dc1-sw01.company.com            │
│                                           │
│  4. Manual Entry                          │
│     └→ User enters address                │
│        or lat/long                        │
└────────────────┬──────────────────────────┘
                 │
                 ↓
        ┌─────────────────┐
        │   Geocoding     │
        │   Service       │
        │  (Google Maps/  │
        │   OpenStreet)   │
        └────────┬────────┘
                 │
                 ↓ Returns lat/long
        ┌─────────────────┐
        │  Store Location │
        │   in Database   │
        └────────┬────────┘
                 │
                 ↓
        ┌─────────────────┐
        │  Place Marker   │
        │   on Map View   │
        └─────────────────┘

Visual Result:
┌──────────────────────────────────────────────────────────┐
│                      Interactive Map                      │
│                                                           │
│                    🗺️  Map Tiles                         │
│                                                           │
│    New York                       Boston                 │
│      📍 (5 devices)                📍 (3 devices)        │
│        │                              │                  │
│        └─────────────🔗─────────────┘                    │
│              Link between sites                          │
│                                                           │
│                                                           │
│    Philadelphia                                          │
│      📍 (2 devices)                                      │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

---

## Alert & Event Processing

```
┌─────────────────────────────────────────────────────────────────────────┐
│                      ALERT PROCESSING FLOW                               │
└─────────────────────────────────────────────────────────────────────────┘

MONITORING COLLECTORS
  │
  ├─→ CPU Utilization: 95% (threshold: 80%)
  ├─→ Memory Usage: 90% (threshold: 85%)
  ├─→ Interface Down: GigE0/1
  └─→ Device Unreachable: Router-1
       │
       ↓
┌─────────────────────┐
│  Threshold Engine   │
│  • Compare values   │
│  • Check thresholds │
│  • Detect violations│
└──────────┬──────────┘
           │
           ↓ Threshold Exceeded
┌─────────────────────┐
│  Dependency Check   │
│  • Is parent down?  │
│  • Apply suppression│
└──────────┬──────────┘
           │
           ↓ Not Suppressed
┌─────────────────────┐
│  Alert Generation   │
│  • Severity         │
│  • Message          │
│  • Timestamp        │
└──────────┬──────────┘
           │
           ├──────────────────────┬──────────────────┬───────────────┐
           │                      │                  │               │
           ↓                      ↓                  ↓               ↓
    ┌───────────┐       ┌─────────────┐    ┌────────────┐   ┌──────────┐
    │  Database │       │ Email       │    │  Webhook   │   │  SNMP    │
    │  Storage  │       │ Notification│    │   Call     │   │  Trap    │
    └───────────┘       └─────────────┘    └────────────┘   └──────────┘
           │
           ↓
    ┌───────────┐
    │ Dashboard │
    │  Update   │
    │ (Real-time│
    │ WebSocket)│
    └───────────┘
           │
           ↓
    ┌─────────────────┐
    │  User Sees      │
    │  Alert Banner   │
    │  🔔 [3 alerts]  │
    └─────────────────┘

USER ACTIONS:
  • Acknowledge alert
  • Add comment
  • Create ticket
  • Suppress future alerts
  • View related events
```

---

## Configuration Backup Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CONFIGURATION BACKUP FLOW                             │
└─────────────────────────────────────────────────────────────────────────┘

TRIGGER
  ├─→ Scheduled (daily at 2 AM)
  ├─→ Manual (user clicks "Backup Now")
  └─→ Change Detected (SNMP trap received)
       │
       ↓
┌──────────────────────────┐
│  Backup Service          │
│  • Select devices        │
│  • Check credentials     │
│  • Determine method      │
└────────────┬─────────────┘
             │
     ┌───────┴───────┬───────────────┬──────────────┐
     ↓               ↓               ↓              ↓
┌─────────┐    ┌─────────┐    ┌──────────┐   ┌──────────┐
│  SSH    │    │  TFTP   │    │  NETCONF │   │ REST API │
│ Method  │    │ Method  │    │  Method  │   │  Method  │
└────┬────┘    └────┬────┘    └────┬─────┘   └────┬─────┘
     │              │              │              │
     │   SSH: show run            │              │
     │   TFTP: copy run tftp      │              │
     │   NETCONF: get-config      │              │
     │   API: GET /config         │              │
     │              │              │              │
     └──────────────┴──────────────┴──────────────┘
                    │
                    ↓
        ┌────────────────────────┐
        │  Configuration Text    │
        │  • Raw config          │
        │  • Timestamp           │
        └────────┬───────────────┘
                 │
                 ↓
        ┌────────────────────────┐
        │  Calculate Checksum    │
        │  (MD5/SHA256)          │
        └────────┬───────────────┘
                 │
                 ↓
        ┌────────────────────────┐
        │  Compare to Previous   │
        │  • Diff calculation    │
        │  • Change detection    │
        └────────┬───────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ↓                 ↓
  ┌──────────┐      ┌──────────┐
  │ No Change│      │ Changed  │
  │  (Skip)  │      │  (Store) │
  └──────────┘      └────┬─────┘
                         │
                         ↓
              ┌───────────────────┐
              │  Compliance Check │
              │  • Apply rules    │
              │  • Flag violations│
              └─────────┬─────────┘
                        │
                ┌───────┴───────┐
                │               │
                ↓               ↓
         ┌──────────┐    ┌──────────┐
         │  Store   │    │ Generate │
         │ Version  │    │  Alert   │
         │ in DB    │    │ (if fail)│
         └──────────┘    └──────────┘

Version History View:
┌──────────────────────────────────────────────────────┐
│ Device: core-router-01                               │
│                                                      │
│ [v10] 2025-01-15 02:00:00 | Manual | User: admin   │
│ [v9]  2025-01-14 02:00:00 | Auto   | Changes: +5   │
│ [v8]  2025-01-13 02:00:00 | Auto   | Changes: +2   │
│                                                      │
│ [Compare v9 <-> v10] [Restore v9] [Download]        │
└──────────────────────────────────────────────────────┘
```

---

## State Management Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    APPLICATION STATE FLOW                                │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐
│  Global State   │
│  (App.tsx)      │
│                 │
│  • devices[]    │
│  • links[]      │
│  • sites[]      │
│  • credentials[]│
│  • events[]     │
│  • filters      │
│  • selectedView │
└────────┬────────┘
         │
    ┌────┴────┐
    │ Props   │
    └────┬────┘
         │
         ↓
┌─────────────────────────────────────┐
│      Component Tree                 │
│                                     │
│  Layout                             │
│    ├─ Header                        │
│    │   └─ Notifications ←─[events]  │
│    │                                │
│    ├─ Sidebar                       │
│    │   └─ NavMenu ←─[selectedView]  │
│    │                                │
│    └─ Content                       │
│        ├─ DeviceList ←─[devices]    │
│        │   └─ DeviceRow (each)      │
│        │                            │
│        ├─ NetworkMap ←─[devices,    │
│        │                 links]     │
│        │                            │
│        └─ Dashboard ←─[devices,     │
│              events, metrics]       │
└─────────────────────────────────────┘

Component Communication:
┌──────────────┐    callback     ┌──────────────┐
│ DeviceList   │───────────────→ │     App      │
│              │ onDeviceSelect  │              │
└──────────────┘                 └──────┬───────┘
                                        │
                                   setState
                                        │
                                        ↓
                                 ┌──────────────┐
                                 │DeviceDetails │
                                 │  (Modal)     │
                                 └──────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         SECURITY LAYERS                                  │
└─────────────────────────────────────────────────────────────────────────┘

USER
  │
  │ HTTPS (TLS 1.3)
  ↓
┌───────────────────────┐
│   Load Balancer       │
│   • TLS Termination   │
│   • DDoS Protection   │
└──────────┬────────────┘
           │
           ↓
┌───────────────────────┐
│   API Gateway         │
│   • Authentication    │────→ JWT Token Validation
│   • Authorization     │────→ Role-Based Access Control (RBAC)
│   • Rate Limiting     │────→ Prevent API abuse
└──────────┬────────────┘
           │
           ↓
┌───────────────────────┐
│   Application Layer   │
│   • Input Validation  │────→ Prevent injection
│   • Session Mgmt      │────→ Secure session tokens
└──────────┬────────────┘
           │
           ↓
┌───────────────────────┐
│   Backend Services    │
│   • Credential Vault  │────→ Encrypted storage
│   • Secure Protocols  │────→ SNMPv3, SSH (no Telnet)
└──────────┬────────────┘
           │
           ↓
┌───────────────────────┐
│   Database            │
│   • Encryption at Rest│────→ AES-256
│   • Access Control    │────→ Least privilege
│   • Audit Logging     │────→ Track all access
└───────────────────────┘

Credential Encryption Flow:
User Password → Bcrypt Hash → Database
SNMP Community → AES-256 → Encrypted Storage
SSH Private Key → Encrypted File → Secure Vault

Access Control Matrix:
┌──────────┬──────┬───────┬──────┬────────┐
│ Role     │ View │ Edit  │Delete│ Execute│
├──────────┼──────┼───────┼──────┼────────┤
│ Admin    │  ✓   │   ✓   │  ✓   │   ✓    │
│ Operator │  ✓   │   ✓   │  ✗   │   ✓    │
│ Viewer   │  ✓   │   ✗   │  ✗   │   ✗    │
│ Guest    │  ✗   │   ✗   │  ✗   │   ✗    │
└──────────┴──────┴───────┴──────┴────────┘
```

---

## Performance Optimization

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PERFORMANCE OPTIMIZATION                              │
└─────────────────────────────────────────────────────────────────────────┘

FRONTEND
  │
  ├─→ Code Splitting
  │   • Lazy load components
  │   • Route-based chunks
  │
  ├─→ Caching
  │   • React.memo for components
  │   • useMemo for calculations
  │   • Service Worker for assets
  │
  ├─→ Virtualization
  │   • Large lists (react-window)
  │   • Only render visible items
  │
  └─→ Debouncing
      • Search inputs
      • Filter updates

BACKEND
  │
  ├─→ Database Optimization
  │   • Indexes on frequently queried fields
  │   • Connection pooling
  │   • Query optimization
  │
  ├─→ Caching (Redis)
  │   • Session data
  │   • Frequently accessed data
  │   • API responses
  │
  ├─→ Async Processing
  │   • Message queue (RabbitMQ)
  │   • Background jobs
  │   • Non-blocking operations
  │
  └─→ CDN
      • Static assets
      • Geographic distribution

NETWORK OPERATIONS
  │
  ├─→ Parallel Execution
  │   • Device queries in parallel
  │   • Thread/process pools
  │
  ├─→ Batch Operations
  │   • Group SNMP requests
  │   • Bulk database inserts
  │
  └─→ Smart Polling
      • Adaptive intervals
      • Priority-based scheduling

Performance Metrics Target:
┌──────────────────────────┬──────────────┐
│ Metric                   │ Target       │
├──────────────────────────┼──────────────┤
│ Page Load Time           │ < 2 seconds  │
│ API Response Time        │ < 200ms      │
│ Discovery Time (100 dev) │ < 5 minutes  │
│ Topology Render          │ < 1 second   │
│ Dashboard Refresh        │ < 500ms      │
└──────────────────────────┴──────────────┘
```

---

## Deployment Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    PRODUCTION DEPLOYMENT                                 │
└─────────────────────────────────────────────────────────────────────────┘

                         ┌──────────────┐
                         │   Internet   │
                         └──────┬───────┘
                                │
                         ┌──────┴───────┐
                         │   Firewall   │
                         └──────┬───────┘
                                │
                    ┌───────────┴───────────┐
                    │   Load Balancer       │
                    │   (nginx/HAProxy)     │
                    │   Port 443 (HTTPS)    │
                    └───────────┬───────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
            ┌───────┴────────┐    ┌────────┴────────┐
            │  Web Server 1  │    │  Web Server 2   │
            │  (React App)   │    │  (React App)    │
            │  Port 3000     │    │  Port 3000      │
            └───────┬────────┘    └────────┬────────┘
                    │                      │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴──────────┐
                    │   API Server        │
                    │   Node.js/Python    │
                    │   Port 8000         │
                    └──────────┬──────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
┌───────┴────────┐  ┌──────────┴─────────┐  ┌────────┴────────┐
│  PostgreSQL    │  │  Redis Cache       │  │  InfluxDB       │
│  (Topology)    │  │  (Session/Cache)   │  │  (Metrics)      │
│  Port 5432     │  │  Port 6379         │  │  Port 8086      │
└────────────────┘  └────────────────────┘  └─────────────────┘
        │
        │ Replication
        ↓
┌────────────────┐
│  PostgreSQL    │
│  Replica       │
│  (Read-only)   │
└────────────────┘

Network Access (Management):
API Server → Network Devices
  • SNMP (UDP 161)
  • SSH (TCP 22)
  • HTTPS (TCP 443) for cloud/REST APIs
```

---

**Visual Architecture Guide Version**: 1.0.0  
**Last Updated**: 2025  
**For detailed documentation, see**: `TOPOLOGY_MANAGER_DATASHEET.md`

