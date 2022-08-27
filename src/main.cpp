#include <iostream>

#include "SFML/Graphics.hpp"


const int WIDTH = 1280;
const int HEIGHT = 720;
sf::Vertex vertices[] = {
    sf::Vertex(sf::Vector2f(WIDTH, HEIGHT)),
    sf::Vertex(sf::Vector2f(0, HEIGHT)),
    sf::Vertex(sf::Vector2f(0, 0)),
    sf::Vertex(sf::Vector2f(WIDTH, 0))
};



int main()
{
    sf::RenderWindow window(sf::VideoMode(WIDTH, HEIGHT), "Animations", sf::Style::Close);

    sf::Shader shader;
    if (!shader.loadFromFile("../shaders/fragment_shader.frag", sf::Shader::Fragment))
    {
        std::cout << "Shader loading error\n";
    }
    shader.setUniform("WIDTH", (float)WIDTH);
    shader.setUniform("HEIGHT", (float)HEIGHT);


    sf::Clock clock;

    while (window.isOpen())
    {
        sf::Event event;
        while (window.pollEvent(event))
        {
            if (event.type == sf::Event::Closed)
                window.close();
        }

        shader.setUniform("TIME", clock.getElapsedTime().asSeconds());

        window.clear();
        window.draw(vertices, 4, sf::Quads, &shader);
        window.display();
    }

    return 0;
}
