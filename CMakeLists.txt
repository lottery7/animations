cmake_minimum_required(VERSION 3.2)

project(animations)

set(CMAKE_CXX_FLAGS "-Wall")

include_directories(include)
link_directories(bin)
link_libraries(
    sfml-audio-2.dll
    sfml-graphics-2.dll
    sfml-network-2.dll
    sfml-system-2.dll
    sfml-window-2.dll
)

add_executable(${PROJECT_NAME}
    src/main.cpp
)
