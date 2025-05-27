#!/usr/bin/env python3
"""
Mobius Strip Modeling Module

This module provides a class for modeling a Mobius strip using parametric equations
and computing its geometric properties such as surface area and edge length.

Author: Manus AI
Date: May 27, 2025
"""

import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm


class MobiusStrip:
    """
    A class representing a Mobius strip with methods to compute its geometric properties.
    
    The Mobius strip is defined by the parametric equations:
    x(u,v) = (R + v*cos(u/2))*cos(u)
    y(u,v) = (R + v*cos(u/2))*sin(u)
    z(u,v) = v*sin(u/2)
    
    where:
    - u ∈ [0, 2π] is the angle parameter
    - v ∈ [-w/2, w/2] is the width parameter
    - R is the radius (distance from center to the strip)
    - w is the width of the strip
    """
    
    def __init__(self, radius=1.0, width=0.5, resolution=100):
        """
        Initialize a Mobius strip with given parameters.
        
        Args:
            radius (float): Distance from the center to the strip (R)
            width (float): Width of the strip (w)
            resolution (int): Number of points in the mesh (n)
        """
        self.R = radius
        self.w = width
        self.n = resolution
        
        # Initialize mesh points
        self.u_range = np.linspace(0, 2*np.pi, self.n)
        self.v_range = np.linspace(-self.w/2, self.w/2, self.n)
        self.U, self.V = np.meshgrid(self.u_range, self.v_range)
        
        # Initialize mesh coordinates
        self.X = None
        self.Y = None
        self.Z = None
        
        # Generate the mesh
        self._generate_mesh()
    
    def _generate_mesh(self):
        """
        Generate the 3D mesh of points on the Mobius strip surface.
        
        Uses the parametric equations to compute x, y, z coordinates for each (u,v) pair.
        """
        # Compute the coordinates using the parametric equations
        self.X = (self.R + self.V * np.cos(self.U/2)) * np.cos(self.U)
        self.Y = (self.R + self.V * np.cos(self.U/2)) * np.sin(self.U)
        self.Z = self.V * np.sin(self.U/2)
    
    def get_mesh_points(self):
        """
        Return the mesh points as a tuple of coordinate arrays.
        
        Returns:
            tuple: (X, Y, Z) arrays of coordinates
        """
        return (self.X, self.Y, self.Z)
    
    def calculate_surface_area(self, method='numerical'):
        """
        Calculate the surface area of the Mobius strip using numerical integration.
        
        The surface area of a parametric surface is given by the double integral:
        ∬|ru × rv| du dv
        
        where ru and rv are partial derivatives with respect to u and v.
        
        Args:
            method (str): Method to use for calculation ('numerical')
            
        Returns:
            float: Surface area of the Mobius strip
        """
        if method != 'numerical':
            raise ValueError("Only 'numerical' method is currently supported")
        
        # Create finer grid for numerical integration
        n_integration = max(self.n * 2, 200)  # Higher resolution for integration
        u_vals = np.linspace(0, 2*np.pi, n_integration)
        v_vals = np.linspace(-self.w/2, self.w/2, n_integration)
        
        # Step sizes for integration
        du = u_vals[1] - u_vals[0]
        dv = v_vals[1] - v_vals[0]
        
        # Initialize surface area
        surface_area = 0.0
        
        # Numerical integration over the parameter space
        for i in range(len(u_vals)):
            for j in range(len(v_vals)):
                u = u_vals[i]
                v = v_vals[j]
                
                # Calculate partial derivatives
                # ru = ∂r/∂u
                ru_x = -np.sin(u) * (self.R + v * np.cos(u/2)) - v * np.sin(u/2) * np.cos(u) / 2
                ru_y = np.cos(u) * (self.R + v * np.cos(u/2)) - v * np.sin(u/2) * np.sin(u) / 2
                ru_z = v * np.cos(u/2) / 2
                
                # rv = ∂r/∂v
                rv_x = np.cos(u/2) * np.cos(u)
                rv_y = np.cos(u/2) * np.sin(u)
                rv_z = np.sin(u/2)
                
                # Calculate cross product |ru × rv|
                cross_x = ru_y * rv_z - ru_z * rv_y
                cross_y = ru_z * rv_x - ru_x * rv_z
                cross_z = ru_x * rv_y - ru_y * rv_x
                
                # Magnitude of cross product
                cross_magnitude = np.sqrt(cross_x**2 + cross_y**2 + cross_z**2)
                
                # Add contribution to surface area
                surface_area += cross_magnitude * du * dv
        
        return surface_area
    
    def calculate_edge_length(self):
        """
        Calculate the length of the edge of the Mobius strip.
        
        The edge of the Mobius strip corresponds to v = w/2 or v = -w/2.
        We calculate the length by numerical integration of the arc length formula:
        L = ∫|dr/du| du
        
        Returns:
            float: Length of the edge
        """
        # Number of points for numerical integration
        n_integration = max(self.n * 2, 200)
        
        # Parameter values for the edge (u varies, v is fixed at w/2)
        u_vals = np.linspace(0, 2*np.pi, n_integration)
        v = self.w/2  # Using the outer edge (v = w/2)
        
        # Step size for integration
        du = u_vals[1] - u_vals[0]
        
        # Initialize edge length
        edge_length = 0.0
        
        # Numerical integration along the edge
        for i in range(len(u_vals)):
            u = u_vals[i]
            
            # Calculate derivative dr/du at the edge
            # These are the derivatives of the parametric equations with respect to u
            dx_du = -np.sin(u) * (self.R + v * np.cos(u/2)) - v * np.sin(u/2) * np.cos(u) / 2
            dy_du = np.cos(u) * (self.R + v * np.cos(u/2)) - v * np.sin(u/2) * np.sin(u) / 2
            dz_du = v * np.cos(u/2) / 2
            
            # Magnitude of the derivative (arc length element)
            dr_du_magnitude = np.sqrt(dx_du**2 + dy_du**2 + dz_du**2)
            
            # Add contribution to edge length
            edge_length += dr_du_magnitude * du
        
        return edge_length
    
    def visualize(self, save_path=None, show=True, cmap='viridis'):
        """
        Visualize the Mobius strip in 3D.
        
        Args:
            save_path (str, optional): Path to save the visualization image
            show (bool): Whether to display the plot
            cmap (str): Colormap to use for the surface
            
        Returns:
            matplotlib.figure.Figure: The figure object
        """
        # Create a new figure with 3D projection
        fig = plt.figure(figsize=(10, 8))
        ax = fig.add_subplot(111, projection='3d')
        
        # Plot the surface
        surf = ax.plot_surface(
            self.X, self.Y, self.Z, 
            cmap=cmap,
            linewidth=0,
            antialiased=True,
            alpha=0.8
        )
        
        # Add a color bar
        fig.colorbar(surf, ax=ax, shrink=0.5, aspect=5)
        
        # Plot the edge (boundary) of the Mobius strip
        u_edge = np.linspace(0, 2*np.pi, self.n)
        v_edge = self.w/2  # Using the outer edge
        
        # Calculate edge coordinates
        x_edge = (self.R + v_edge * np.cos(u_edge/2)) * np.cos(u_edge)
        y_edge = (self.R + v_edge * np.cos(u_edge/2)) * np.sin(u_edge)
        z_edge = v_edge * np.sin(u_edge/2)
        
        # Plot the edge as a thicker line
        ax.plot(x_edge, y_edge, z_edge, 'r-', linewidth=3, label='Edge')
        
        # Set labels and title
        ax.set_xlabel('X')
        ax.set_ylabel('Y')
        ax.set_zlabel('Z')
        ax.set_title(f'Mobius Strip (R={self.R}, w={self.w})')
        
        # Add legend
        ax.legend()
        
        # Set equal aspect ratio
        ax.set_box_aspect([1, 1, 1])
        
        # Adjust view angle for better visualization
        ax.view_init(elev=30, azim=45)
        
        # Save the figure if a path is provided
        if save_path:
            plt.savefig(save_path, dpi=300, bbox_inches='tight')
            print(f"Visualization saved to {save_path}")
        
        # Show the plot if requested
        if show:
            plt.tight_layout()
            plt.show()
        
        return fig


# Example usage
if __name__ == "__main__":
    # Create a Mobius strip with default parameters
    mobius = MobiusStrip(radius=1.0, width=0.5, resolution=100)
    
    # Print basic information
    print(f"Mobius Strip with R={mobius.R}, w={mobius.w}, n={mobius.n}")
    
    # Calculate and print geometric properties
    surface_area = mobius.calculate_surface_area()
    edge_length = mobius.calculate_edge_length()
    
    print(f"Surface Area: {surface_area:.4f}")
    print(f"Edge Length: {edge_length:.4f}")
    
    # Visualize the strip and save the image
    mobius.visualize(save_path="mobius_strip_visualization.png", show=False)
    print("Visualization saved to mobius_strip_visualization.png")
    
    # Test with different parameters
    print("\nTesting with different parameters:")
    
    # Test case 1: Larger radius
    mobius_large_r = MobiusStrip(radius=2.0, width=0.5, resolution=100)
    sa_large_r = mobius_large_r.calculate_surface_area()
    el_large_r = mobius_large_r.calculate_edge_length()
    print(f"R=2.0, w=0.5: Surface Area={sa_large_r:.4f}, Edge Length={el_large_r:.4f}")
    
    # Test case 2: Wider strip
    mobius_wide = MobiusStrip(radius=1.0, width=1.0, resolution=100)
    sa_wide = mobius_wide.calculate_surface_area()
    el_wide = mobius_wide.calculate_edge_length()
    print(f"R=1.0, w=1.0: Surface Area={sa_wide:.4f}, Edge Length={el_wide:.4f}")
    
    # Test case 3: Higher resolution
    mobius_high_res = MobiusStrip(radius=1.0, width=0.5, resolution=200)
    sa_high_res = mobius_high_res.calculate_surface_area()
    el_high_res = mobius_high_res.calculate_edge_length()
    print(f"R=1.0, w=0.5, n=200: Surface Area={sa_high_res:.4f}, Edge Length={el_high_res:.4f}")
    
    print("\nValidation complete!")
