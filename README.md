**A library for highly interactive JavaScript applications.**
> This is my continually changing compilation of solutions designed to place nice with each other and speed up web development.
> <br>Each module is a response to a common problem I've experienced, and an attempt at solving it generically enough to drag and drop wherever.
> 
> v0.1 (shown here) is currently in development, and I intend to publish an NPM package once it is finished. [Easel v0.1 GitHub](https://github.com/aidanbeck/easel/tree/v0.1)

## Example Programs
| Program                          | Description                                                                  |
|----------------------------------|------------------------------------------------------------------------------|
| [Sketchpad](demo.html?sketchpad) | a sketchpad program leveraging the **Theatre** module.                       |
| [Orbit](demo.html?orbit)         | an orbit simulation leveraging the **Velocity** module.                      |
| [Chat](demo.html?chat)           | an online chatroom leveraging the **Messenger** and **Switchboard** modules. |
| [Layout](demo.html?layout)       | a layout editor with collision detection leveraging the **Shapes** module.   |
| [Aim](demo.html?aim)             | a platformer leveraging the **Keyboard** module. *- Keyboard Required*       |
| [Hills](demo.html?hills)         | a 3D scene leveraging the **Terrain** module. *- Keyboard Required*          |
<!-- | [Scene](demo.html?scene)         | an interative page leveraging the **Card** module.                           | -->
<!-- | [Dancers](demo.html?dancers)     | an animation test leveraging the **Texture** module.                         | -->


## Easel Modules
| Module        | Description                                                        |
|---------------|--------------------------------------------------------------------|
| Theatre       | Responsive pixel canvas.                                           |
| Keyboard      | Keybind inputs.                                                    |
| Texture       | Image and animation rendering.                                     |
| Shape         | Overlap detection for Rectangles, Circles, and Points.             |
| Velocity      | Make things move!                                                  |
| Terrain       | Efficient 3D rendering for heightmaps.                             |
| Messenger     | Client side websocket routing & handling.                          |
| Switchboard   | Server side websocket routing handling.                            |
| Card          | HyperCard inspired framework for interactive UI. *- In Development*|
| PhysicsObject | Handles velocity upon collisions. *- In Development*               |