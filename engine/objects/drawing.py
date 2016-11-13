
from matplotlib import pyplot
from matplotlib.patches import Rectangle

shape_edge_colour = '#000000'
shape_alpha = 0.8
id_font_size = 4.5


def plot_game(board, filename=None):
    """Plots the tetris game.

    Plot to file if a filename is given, otherwise plot to the screen.
    """
    board_height = int(board.HEIGHT + 2)

    # Create figure and resize
    pyplot.clf()
    fig = pyplot.gcf()
    fig.set_size_inches(8, board_height * 0.5 + 1)

    ax = fig.add_subplot(111)

    # Plot the board and pieces
    plot_board(ax, board, board_height)
    for x in board.travel_right:
        for y in board.travel_up:
            plot_piece(ax, board.slots[x, y])

    # Add the game title
    ax.set_title("Tetris Attack")

    # Plot to file or screen
    if filename is None:
        # Show the plot
        # pyplot.show()
        # pyplot.ion()
        pyplot.pause(0.5)
    else:
        # Otherwise, save as PNG
        if not filename.lower().endswith('.png'):
            filename += '.png'

        pyplot.savefig(filename, dpi=120)


def plot_board(ax, board, height):
    """Helper - Plots the game board"""

    ax.grid(color='k', linestyle=':', linewidth=1)

    xrange = [0, board.WIDTH]
    yrange = [0, height]

    ax.set_xlim(*xrange)
    ax.set_xticks(list(range(*xrange)) + [xrange[-1]])
    ax.set_ylim(*yrange)
    ax.set_yticks(list(range(*yrange)) + [yrange[-1]])
    ax.set_aspect(1)


def plot_piece(ax, piece):
    """Helper - Plots a single game piece"""
    if not piece: return

    patch = Rectangle((piece.x, piece.y), 1, 1, facecolor=piece.type.color)
    ax.add_patch(patch)

    # Show piece status
    centroid = piece.x + 0.5, piece.y + 0.5
    s = str(piece.state.name)
    ax.text(centroid[0], centroid[1], s,
            horizontalalignment='center',
            verticalalignment='center',
            size=id_font_size, )

