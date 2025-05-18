using Microsoft.EntityFrameworkCore;
using FindChest.Models;
using FindChest.ViewModels;
using System.Collections.Generic;

namespace FindChest.Services
{
    public class FindMinFuelService
    {
        //Calculate distance between 2 point
        //Input: Coordinates A and Coordinates B
        //Output: Distance between A and B
        private static double CalculateDistance((int x, int y) a, (int x, int y) b)
        {
            int dx = a.x - b.x;
            int dy = a.y - b.y;
            return Math.Sqrt(dx * dx + dy * dy);
        }

        //Group the list of coordinates for chest[i]
        //Input: Matrix A
        //Output: A dictionary where the key represents the chest type, and the value is a list of its coordinates.
        public static Dictionary<int, List<(int, int)>> GroupValue(List<List<int>> matrix)
        {
            Dictionary<int, List<(int, int)>> groupMatrix = new Dictionary<int, List<(int, int)>>();
            for (int i = 0; i < matrix.Count; i++)
            {
                for (int j = 0; j < matrix[i].Count; j++)
                {
                    int value = matrix[i][j];
                    if (!groupMatrix.ContainsKey(value))
                    {
                        groupMatrix[value] = new List<(int, int)>();
                    }
                    groupMatrix[value].Add((i + 1, j + 1));
                }
            }
            return groupMatrix;
        }

        //Use Dijkstra's algorithm to calculate the distance from position X+1 from position X+1 and its distance
        //Input: List position X, List position X+1 and list distance of position X
        //Output: List distance of position X+1
        private static List<double> CalculateListDistance(List<(int, int)> listA, List<(int, int)> listB, List<double> listDistanceA)
        {
            List<double> listDistanceB = new List<double>(new double[listB.Count]);
            foreach (var valueA in listA)
            {
                int indexA = listA.IndexOf(valueA);
                foreach (var valueB in listB)
                {
                    double distance = CalculateDistance((valueA), (valueB)) + listDistanceA[indexA];
                    int indexB = listB.IndexOf(valueB);

                    if (listDistanceB[indexB] == 0 || distance < listDistanceB[indexB])
                    {
                        listDistanceB[indexB] = distance;
                    }
                }

            }
            return listDistanceB;
        }

        //Find the minimum fuel
        //Input:  and the number of chest type
        //Output: A dictionary store list cordinates the minimum fuel
        public static Double FindMinFuel(List<List<int>> matrix, int p)
        {
            var groupValue = GroupValue(matrix);
            Dictionary<int, List<double>> groupDistance = new Dictionary<int, List<double>>();
            for (int i = 1; i < p + 1; i++)
            {
                var listX = new List<(int, int)>();
                var distanceX = new List<double>();

                if (i == 1)
                {
                    listX.Add((1, 1));
                    distanceX.Add(0);
                }
                else
                {
                    listX = groupValue[i - 1];
                    distanceX = groupDistance[i - 1];
                }
                var listDistance = CalculateListDistance(listX, groupValue[i], distanceX);

                if (i == 1)
                {
                    groupDistance[1] = listDistance;
                }
                else groupDistance[i] = listDistance;
            }

            return groupDistance[p][0];
        }
    }
}
