1. Introduce a Centralized DataFrame Management Module
Purpose:
Create a dedicated service—a “DataFrameManager”—to handle all tasks related to storing, identifying, and listing user-uploaded dataframes.
Guidance:
Data Structure:
Each dataframe should be represented as an object that includes:
Unique Identifier: A unique ID (e.g., “df1”, “df2”) to distinguish each dataframe.
Metadata: Information about the dataframe such as its name, creation timestamp, and a list of columns.
Data: The actual data (likely parsed from CSV) stored in a format suitable for sql.js operations.
Consider maintaining a collection (e.g., an array or a mapping keyed by the unique IDs) so that you can easily list and retrieve all dataframes within the current user session.
APIs/Methods:
Implement clear, self-contained methods such as:
addDataFrame(data, meta)
getDataFrame(id)
listDataFrames()
removeDataFrame(id)
updateDataFrame(id, updatedData)
Benefits:
This abstraction makes future enhancements easier (for example, persisting state in IndexedDB or localStorage) and avoids mixing business logic directly within UI components.
---
2. Separate SQL Processing from UI
Purpose:
Decouple SQL querying logic from UI components so that UI changes and data processing can evolve independently. This produces a more modular, scalable architecture.
Guidance:
SQL Query Engine Module:
Create a separate module (for example, called QueryEngine or SqlService) that serves as an interface to sql.js. This module will:
Accept a dataframe (or a reference to one, via its unique identifier).
Execute SQL queries against the dataframe.
Return the results in a consistent format for the UI to render.
Asynchronous Processing:
Although you want processing off the main UI thread, you can use a Web Worker to run sql.js queries to avoid performance bottlenecks. This means:
Offload heavy SQL query execution to a worker.
Communicate between the main thread and the worker via message passing.
Advantages:
By separating the SQL processing, you keep concerns independent, making it easier to manage and scale each part individually. If sql.js evolves or is swapped for another library later, your changes remain confined to this module.
---
3. Modularize the Codebase
Purpose:
Keep different parts of the application isolated—from UI components to data handling—to make the project more maintainable and scalable over time.
Guidance:
Directory Structure:
Consider organizing the project into folders such as:
components: Contains UI components (e.g., panel, tabs, data analyzer view).
services: Contains service modules like DataFrameManager and QueryEngine.
models: Contains model definitions such as DataFrame and Column objects.
utils: Utility functions and helper classes.
Event-Driven Architecture:
Use an event bus or similar pattern to notify UI components when dataframes are added, updated, or removed. This decouples the direct dependency between UI and business logic.
Testability:
A modular structure makes unit and integration tests easier to write and maintain. Each module’s responsibility is well defined, and dependencies between modules are minimized.
---
4. Manage Data Through the Session
Purpose:
Give the user a seamless experience where all added dataframes are tracked and listed for further interactions (like running SQL queries).
Guidance:
Session State:
Ensure that the DataFrameManager tracks all user dataframes from the current session. On each “+” via the UI, a new dataframe is created, given a unique ID, and stored in the manager.
Listing DataFrames:
Build an API or UI component that periodically (or on demand) queries the manager for all stored dataframes. This list can be displayed for the user to select which dataframe to run a query against.
Persistence Strategy:
While you don’t plan to process on a server or use heavy client-side processing, consider whether some lightweight persistence (like session storage or IndexedDB) is warranted if you want the state to survive page reloads or browser restarts.
---