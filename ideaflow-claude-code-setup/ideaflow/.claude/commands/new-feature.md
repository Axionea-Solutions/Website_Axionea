Start a new IdeaFlow feature branch and create a plan before touching code.

Steps:
1. Ask the user to describe the feature goal in 1-2 sentences if not already given
2. Run: git checkout -b feature/$ARGUMENTS
3. Create docs/features/$ARGUMENTS.md with this structure:
   - Goal (1 sentence)
   - Files to create/modify (list)
   - API changes (if any)
   - DB changes (if any)
   - Test cases (at least 2)
4. Show the plan and ask for approval before writing any code
5. Only proceed to implementation after explicit "go ahead" confirmation
