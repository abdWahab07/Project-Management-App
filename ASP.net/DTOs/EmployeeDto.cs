public class CreateEmployeeDto
{
    public string Name { get; set; }
    public string Designation { get; set; }
    public int Experience { get; set; }
    public string Description { get; set; }
    public string PastDesignation { get; set; }
    public string Username { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public string Gmail { get; set; }

    // New fields
    public int TasksAssigned { get; set; }
    public int TasksPending { get; set; }
    public int TasksCompleted { get; set; }
}
